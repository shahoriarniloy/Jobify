import { PiBag } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
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
          <a className="link link-hover">{t("about_us")}</a>
        </Link>
        <Link to="/about">
          <a className="link link-hover">{t("contact")}</a>
        </Link>
        <Link to="/advanced-search">
          <a className="link link-hover">{t("jobs")}</a>
        </Link>
        <Link to="/companies">
          <a className="link link-hover">{t("companies")}</a>
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
          {t("copyright")} © {new Date().getFullYear()} - {t("all_rights_reserved")}
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
