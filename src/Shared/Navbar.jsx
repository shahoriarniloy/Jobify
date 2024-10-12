import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const theme = useSelector((state) => state.theme.theme);

  const navItem = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/advanced-search"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          Jobs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          Companies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          Messages
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          Network
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          About
        </NavLink>
      </li>
    </>
  );

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsSticky(scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`navbar shadow-md ${
          isSticky ? "sticky top-0 z-50" : ""
        } roboto-regular ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-[#d4ddeafa] text-black"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-1 z-[1] shadow bg-base-100 rounded-box w-52"
            >
              {navItem}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-[#5E6670] gap-7 menu-horizontal px-1">
            {navItem}
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4"></div>
      </div>
    </div>
  );
};

export default Navbar;
