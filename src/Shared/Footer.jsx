import { PiBag } from "react-icons/pi";
import { Link } from "react-router-dom";

const Footer = () => {
    return (

        <div className="mt-8 mb-0">
            <footer className="footer bg-black p-10 text-white">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col items-start mr-16"> 
                        <div className="flex items-center gap-2 mb-4">
                            <PiBag className="w-8 h-8" /> 
                            <Link to="/" className="text-2xl font-bold text-white">Jobify</Link>
                        </div>
                    </div>

                    <div className="flex lg:flex-row md:flex-row flex-col gap-16">
                        <nav>
                            <h6 className="footer-title font-semibold mb-3">Services</h6>
                            <ul>
                                <li><a className="link link-hover text-gray-400">Branding</a></li>
                                <li><a className="link link-hover text-gray-400">Design</a></li>
                                <li><a className="link link-hover text-gray-400">Marketing</a></li>
                                <li><a className="link link-hover text-gray-400">Advertisement</a></li>
                            </ul>
                        </nav>
                        <nav>
                            <h6 className="footer-title font-semibold mb-3">Company</h6>
                            <ul>
                                <Link to="/about"> About</Link>
                                <li><a className="link link-hover text-gray-400">Contact</a></li>
                                <li><a className="link link-hover text-gray-400">Jobs</a></li>
                                <li><a className="link link-hover text-gray-400">Press kit</a></li>
                            </ul>
                        </nav>
                        <nav>
                            <h6 className="footer-title font-semibold mb-3">Legal</h6>
                            <ul>
                                <li><a className="link link-hover text-gray-400">Terms of use</a></li>
                                <li><a className="link link-hover text-gray-400">Privacy policy</a></li>
                                <li><a className="link link-hover text-gray-400">Cookie policy</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-700 pt-4 text-center">
                    <p className="text-sm text-gray-400">&copy; 2024 Jobify. All rights reserved.</p>
                </div>
            </footer>
        </div>

    );
};

export default Footer;
