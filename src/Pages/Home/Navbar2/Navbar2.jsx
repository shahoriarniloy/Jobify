
import { PiBag } from "react-icons/pi";
import { Link } from "react-router-dom";


const Navbar2 = () => {
    // const { currentUser } = useContext(AuthContext);
    
    return (
        <div>
            <div className="navbar bg-white shadow-md py-2">
                <div className="navbar-start">
                    <div className="flex items-center text-[#0a65cc] gap-2 px-24">
                        <PiBag className="w-6 h-6" /> {/* Set the size of the logo */}
                        <Link to="/" className="text-xl font-bold text-[#0a65cc]">Jobify</Link>
                    </div>
                </div>
                <div className="navbar-end flex items-center gap-4">
                    <Link to="/login">
                        <button className="border-2 border-blue-100 px-4 py-1.5 text-blueCastomize rounded-md">Sign In</button>
                    </Link>
                    {/* <Link to="/post-job">
                        <button className="bg-blueCastomize text-white px-4 py-1.5 rounded-md">Post a Job</button>
                    </Link> */}
                </div>

                {/* <div className="navbar-end flex items-center gap-4 px-24">
                    {currentUser ? (
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img alt="User Avatar" src={cu?.photoURL} />
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="border-2 border-blue-100 px-4 py-1.5 text-blueCastomize rounded-md">Sign In</button>
                            </Link>
                            
                            
                            <Link to="/post-job">
                                <button className="bg-blueCastomize text-white px-4 py-1.5 rounded-md">Post a Job</button>
                            </Link> 
                           
                        </>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default Navbar2;
