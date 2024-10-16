import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
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
          {t("home")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/advanced-search"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("apply_job")} {/* Changed from "Apply Job" to "apply_job" */}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("find_company")} {/* Changed from "Find Company" to "find_company" */}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("messaging")} {/* Changed from "Messaging" to "messaging" */}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("my_network")} {/* Changed from "My Network" to "my_network" */}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("about_us")} {/* Changed from "About Us" to "about_us" */}
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
    <div>
      <div
        className={`navbar shadow-md ${isSticky ? "sticky top-0 z-50" : ""
          } roboto-regular ${theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-[#f4f8fffa] text-black"
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
