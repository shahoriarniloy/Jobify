import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div>
            <div className="auth-container">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
