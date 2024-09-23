import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import mobileLogo from '../../assets/mobileLogo.png';


const Navbar = () => {
    const navItem =
        <>
            <li className='text-brownText font-noto font-semibold'><Link to='/'>Home</Link></li>
            <li className='text-brownText font-noto font-semibold' ><Link to='/'>Find job</Link></li>
            <li className='text-brownText font-noto font-semibold'><Link to='/company-details'>Company Profile</Link></li>
            <li className='text-brownText font-noto font-semibold'><Link to='/about'>About Us</Link></li>
            <li className='text-brownText font-noto font-semibold'><Link to='/dashboard'>Dashboard</Link></li>
        </>
    return (
        <div>
        <div className="navbar bg-baseCastomize fixed top-0 left-0 right-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItem}
                    </ul>
                </div>
                <div>


                    <img className='h-20 w-52 hidden lg:block' src={logo} alt="" />
                    <img className='h-16 w-20 block lg:hidden' src={mobileLogo} alt="Mobile Logo" />

                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" text-white  gap-7 menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end">
            <div>
             <div className="flex gap-4 lg:gap-5">
               <Link to='/login'><button className="bg-white  px-5 py-2 lg:px-7 lg:py-3 rounded-full text-greenCastomize font-noto">Log-in</button></Link>    
               <Link to='/register'><button className="bg-greenCastomize text-yellowCastomize px-5 py-2 lg:px-7 lg:py-3 rounded-full">Register</button></Link> </div>    
            </div>
            {/* {
  user? <>
      <span></span>
  <button onClick={handleSignOut} className="btn btn-outline border-white text-white mx-2">Log Out</button>

  <div className="avata " >
<div className="w-12" >
<div className="tooltip tooltip-bottom" data-tip={user.displayName}> 

<img src={user.photoURL} className="rounded-full" />

</div>
</div>
</div>
  </>
  :
  <div className="navbar-end gap-5">
<Link to="/logIn">
<a className="btn btn-outline border-white text-white">Log-In</a>
</Link>

    </div>


} */}
            </div>
        </div>
        </div>
    
    );
};

export default Navbar;