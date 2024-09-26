import { Outlet } from 'react-router-dom';
import Navbar from '../../Pages/Shared/Navbar';

const AuthLayout = () => {
    return (
        <div>
            <div className="auth-container">
            {/* <Navbar /> */}

                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
