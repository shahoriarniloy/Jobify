import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const options = {
    mode: "payment", 
    amount: 4999,
    currency: "usd", 
    appearance: {
        
    },
};

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise} options={options}>
                <PaymentForm />
            </Elements>
        </div>
    );
};

export default Payment;
