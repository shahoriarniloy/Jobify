import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Navbar from '../Pages/Shared/Navbar';
import useCurrentUser from '../Hooks/useCurrentUser';

const Main = () => {
    const { currentUser } = useCurrentUser();

    return (
        <div className='roboto-regular'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;
