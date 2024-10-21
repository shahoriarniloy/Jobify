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
        <Link to="/about">
          <a className="link link-hover">About us</a>
        </Link>
        <Link to="/about">
          <a className="link link-hover">Contact</a>
        </Link>
        <Link to="/advanced-search">
          <a className="link link-hover">Jobs</a>
        </Link>
        <Link to="/companies">
          <a className="link link-hover">Companies</a>
        </Link>
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
          Copyright © {new Date().getFullYear()} - All right reserved by
          CodeBusters
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
