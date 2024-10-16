import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
import { FaBell } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const { t } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [jobNotifications, setJobNotifications] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const [socket, setSocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
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
          {t("apply_job")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/companies"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("find_company")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("messaging")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/posts"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("my_network")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "active-nav nav-link" : "nav-link"
          }
        >
          {t("about_us")}
        </NavLink>
      </li>
    </>
  );

  useEffect(() => {
    const socketConnection = io("http://localhost:5000");
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("newUser", currentUser?.email);

      socket.on("jobPosted", (data) => {
        Swal.fire({
          icon: "info",
          title: "New Job Posted!",
          text: `A new job "${data.jobTitle}" was posted by ${data.company}`,
          background: "#f4f8ff",
          color: "#333",
          customClass: {
            title: "swal-title",
            content: "swal-content",
            confirmButton: "swal-confirm",
          },
          confirmButtonText: "View Job",
          confirmButtonColor: "#007bff",
          showCancelButton: true,
          cancelButtonText: "Close",
          cancelButtonColor: "#dc3545",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/job/${data.jobId}`;
          }
        });

        setJobNotifications((prevNotifications) => [
          ...prevNotifications,
          { title: data.jobTitle, company: data.company, jobId: data.jobId },
        ]);
      });
    }
  }, [socket, currentUser?.email]);

  const toggleModal = () => {
    console.log("Bell icon clicked! Modal state:", isModalOpen);
    setIsModalOpen((prevState) => !prevState);
  };

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
        className={`navbar shadow-md ${
          isSticky ? "sticky top-0 z-50" : ""
        } roboto-regular ${
          theme === "dark"
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

        <div className="navbar-end relative">
          {/* <FaBell className="cursor-pointer" onClick={toggleModal} />
          {jobNotifications.length > 0 && (
            <div className="notification-count">{jobNotifications.length}</div>
          )} */}

          {isModalOpen && (
            <div
              className="absolute top-10 right-0 bg-white p-4 shadow-lg rounded-lg max-w-xs w-80 z-50"
              style={{ marginRight: "20px" }}
            >
              <h2 className="text-lg font-bold mb-4">Notifications</h2>

              {jobNotifications.length > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm">
                    You have {jobNotifications.length} notifications
                  </p>
                  <button
                    onClick={() => setJobNotifications([])}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              )}

              {jobNotifications.length > 0 ? (
                <ul className="text-sm">
                  {jobNotifications.map((notification, index) => (
                    <li
                      key={index}
                      className="py-2 text-gray-700 bg-bottom bg-slate-300 rounded-md p-4 mb-2"
                    >
                      <Link
                        to={`/job/${notification.jobId}`}
                        className="hover:underline"
                      >
                        <strong>'{notification.title}' position</strong> at{" "}
                        <strong>{notification.company}</strong>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notifications available</p>
              )}

              <div className="flex justify-end">
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
