import { PiBag } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <footer
      className={
        theme === "dark"
          ? "footer footer-center bg-slate-900 text-slate-300 rounded p-10"
          : "footer footer-center bg-white text-base-content rounded p-10"
      }
    >
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com/shahoriarniloy/Jobify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
