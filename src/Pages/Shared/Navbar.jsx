import { Link } from "react-router-dom";
import logo from '../../assets/logo.png'

const Navbar = () => {
    const navItem =
        <>
            <li className='text-brownText font-noto font-semibold'><Link to='/'>Home</Link></li>
            <li className='text-brownText' ><Link to='/'>Find job</Link></li>
            <li className='text-brownText'><Link to='/'>Company Search</Link></li>
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


                    <img className='h-20 w-52' src={logo} alt="" />

                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" text-white  gap-7 menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end">
            <div>
             <div className="flex gap-5">
               <button className="bg-white px-7 py-3 rounded-full text-greenCastomize font-noto">Log-in</button>    
               <button className="bg-greenCastomize text-yellowCastomize px-7 py-3 rounded-full">Register Now</button> </div>    
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