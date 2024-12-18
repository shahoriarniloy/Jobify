import { PiBag } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import  logo from '../assets/logo/logo.png'

const Footer = () => {
  const { t } = useTranslation();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <footer
      className="bg-[#18191c] text-slate-300 rounded pt-[100px] pb-10 px-10"

    >
      <div className="container mx-auto grid md:grid-cols-3 gap-6 md:gap-0 lg:grid-cols-4">

        <div >
          <div className="flex items-center">
            <img className="size-[70px]" src={logo} alt="" />
            <h2 className="text-3xl font-semibold text-[#0a65cc]">Jobify</h2>
          </div>

          <div className="space-y-2">
            <h2><span className="text-gray-400">Call Now :</span> <span className=" font-semibold">+880 01730827996</span></h2>
            <h2><span className="text-gray-400">E-mail :</span> <span className=" font-semibold">jobify@gmail.com</span></h2>
            <h3 className="text-gray-400">Kurigram sodor, Kurigram<br />
              Rangpur, Bangladesh
            </h3>
          </div>

        </div>

        <div className="flex md:justify-end">
          <div className="flex flex-col gap-5 *:text-gray-400">
            <h3 className="font-semibold !text-white">Quick Link</h3>
            <Link>About</Link>
            <Link>Contact</Link>
            <Link>Blog</Link>
            <Link>Pricing</Link>
          </div>
        </div>

        <div className="flex md:justify-end">
          <div className="flex flex-col gap-5 *:text-gray-400">
            <h3 className="font-semibold !text-white">Navigate Now</h3>
            <Link>Browse Jobs</Link>
            <Link>Browse Employers</Link>
            <Link>Candidate Dashboard</Link>
            <Link>Saved Jobs</Link>
          </div>
        </div>

        <div className="flex lg:justify-end">
          <div className="flex flex-col gap-5 *:text-gray-400">
            <h3 className="font-semibold !text-white">Support</h3>
            <Link>Faqs</Link>
            <Link>Privacy Policy</Link>
            <Link>Terms & Conditions</Link>
          </div>
        </div>

      </div>

      {/* lower footer */}
      <hr className="border-1 mt-4" />

      <div className="container mx-auto flex justify-between items-center mt-4">
        <h3>@ 2024 Jobify - Job Portal. All rights Reserved</h3>

        <div>
          <a><FaGithub className="text-2xl" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
