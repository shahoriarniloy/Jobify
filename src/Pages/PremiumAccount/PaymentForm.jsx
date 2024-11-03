import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import axiosSecure from '../../Hooks/UseAxiosSecure';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const loggedUser = useSelector((state) => state.user.loggedUser);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            toast.error("Stripe.js has not loaded properly.");
            return;
        }

        // Trigger form validation and submit the payment
        setLoading(true); // Set loading to true when starting the process
        const { error: submitError } = await elements.submit();
        if (submitError) {
            setLoading(false); // Reset loading state on error
            setErrorMessage(submitError.message);
            toast.error(`Submission error: ${submitError.message}`);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        try {
            const { data } = await axiosSecure.post('/create-intent', {
                amount: 1000, // Amount in cents
                email: loggedUser?.email || '', // Ensure it's a plain string
            });

            const clientSecret = data.clientSecret;

            // Confirm the payment
            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: 'http://localhost:5173/premium-plan',
                },
            });

            if (error) {
                setLoading(false); // Reset loading state on error
                setErrorMessage(error.message);
                toast.error(`Payment confirmation error: ${error.message}`);
            } else {
                // Handle successful payment and upgrade account
                try {
                    // Upgrade account in the backend
                    await axiosSecure.post('/upgrade_account', { email: loggedUser.email });
                    toast.success('Payment successful! Your account has been upgraded to premium.');
                } catch (upgradeError) {
                    toast.error(`Failed to upgrade account: ${upgradeError.message}`);
                } finally {
                    setLoading(false); // Reset loading state after process completes
                }
            }
        } catch (error) {
            setLoading(false); // Reset loading state on error
            console.error('Error creating payment intent:', error);
            toast.error(`Failed to create payment intent: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className='flex justify-end mt-4'>
                <button type="submit" disabled={!stripe || loading} className='btn bg-blue-500 text-white'>
                    {loading ? 'Processing...' : 'Pay'}
                </button>
            </div>
        </form>
    );
};

export default PaymentForm;
