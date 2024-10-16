import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OurTeam = () => {
  const { t } = useTranslation(); // Initialize the translation function

  return (
    <div className="pt-16  lg:pt-20">
      <div className="mx-auto mb-10  sm:text-center">
        <p className="inline-block px-3 py-px mb-4 text-3xl font-semibold tracking-wider text-black  rounded-full bg-teal-accent-400">
          {t("know_our_team")} {/* Updated for translation */}
        </p>
        <p className="text-base text-gray-700 md:text-sm mb-24">
          {t("meet_the_people_behind")}{" "}
          <Link to="/about">
            <span className="text-blue-500">Jobify.</span>
          </Link>{" "}
          {t("group_of_passionate_professionals")}
        </p>
      </div>
      <div className="grid gap-10 mx-auto lg:grid-cols-3 ">
        <div className="grid sm:grid-cols-3">
          <div className="relative w-full lg:h-48 h-96 rounded shadow ">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://i.ibb.co/tq6BdhB/459635328-1531076374210966-5827006199608069936-n.jpg"
              alt="Shahoriar Azad Niloy"
            />
          </div>
          <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
            <p className="text-lg font-bold">{t("shahoriar_azad_niloy")}</p>
            <p className="mb-4 text-xs text-gray-800">
              {t("team_lead_developer")}
            </p>
            <p className="mb-4 text-sm tracking-wide text-gray-800">
              {t("shahoriar_description")}
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/shahoriarniloy"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.7-4.1-1.7-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8 0-.8 0-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.4 1.4 4.2 1.1.1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.4.1-2.9 0 0 1-.3 3.3 1.3 1-.3 2-.4 3-.4 1 0 2 .1 3 .4 2.3-1.6 3.3-1.3 3.3-1.3.7 1.5.2 2.6.1 2.9.8 1 1.3 2.1 1.3 3.4 0 4.8-2.8 5.9-5.5 6.2.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/shahoriarniloy"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3">
          <div className="relative w-full lg:h-48 h-96 rounded shadow sm:h-auto">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://i.ibb.co/KKdG923/458968663-1737661743672221-6606888850658979638-n.jpg"
              alt="Mumtahina Mahbub Efa"
            />
          </div>
          <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
            <p className="text-lg font-bold">{t("mumtahina_mahbub_efa")}</p>
            <p className="mb-4 text-xs text-gray-800">{t("developer")}</p>
            <p className="mb-4 text-sm tracking-wide text-gray-800">
              {t("efa_description")}
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/Bella908"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.7-4.1-1.7-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8 0-.8 0-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.4 1.4 4.2 1.1.1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.4.1-2.9 0 0 1-.3 3.3 1.3 1-.3 2-.4 3-.4 1 0 2 .1 3 .4 2.3-1.6 3.3-1.3 3.3-1.3.7 1.5.2 2.6.1 2.9.8 1 1.3 2.1 1.3 3.4 0 4.8-2.8 5.9-5.5 6.2.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/2zLeJux621QpVnm8/?mibextid=LQQJ4d"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3">
          <div className="relative w-full lg:h-48 h-96 rounded shadow sm:h-auto">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://i.ibb.co/Fwmn9yQ/461014362-1441578429848823-6777233053187165958-n.jpg"
              alt="Indra Ghosh"
            />
          </div>
          <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
            <p className="text-lg font-bold">{t("indra_ghosh")}</p>
            <p className="mb-4 text-xs text-gray-800">{t("indra_developer")}</p>
            <p className="mb-4 text-sm tracking-wide text-gray-800">
              {t("indra_description")}
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/indraghosh02"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.7-4.1-1.7-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8 0-.8 0-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.4 1.4 4.2 1.1.1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.4.1-2.9 0 0 1-.3 3.3 1.3 1-.3 2-.4 3-.4 1 0 2 .1 3 .4 2.3-1.6 3.3-1.3 3.3-1.3.7 1.5.2 2.6.1 2.9.8 1 1.3 2.1 1.3 3.4 0 4.8-2.8 5.9-5.5 6.2.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/indra.priya.564?mibextid=ZbWKwL"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3">
          <div className="relative w-full lg:h-48 h-96 rounded shadow sm:h-auto">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://i.ibb.co/L1BnDrS/459298118-814495080572951-1002648524559915351-n.png"
              alt="Md. Abdullah Az Zahur (Gias)"
            />
          </div>
          <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
            <p className="text-lg font-bold">{t("abdullah_az_zahur_gias")}</p>
            <p className="mb-4 text-xs text-gray-800">{t("gias_developer")}</p>
            <p className="mb-4 text-sm tracking-wide text-gray-800">
              {t("gias_description")}
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/Abdullah-Az-Zahur"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.7-4.1-1.7-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8 0-.8 0-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.4 1.4 4.2 1.1.1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.4.1-2.9 0 0 1-.3 3.3 1.3 1-.3 2-.4 3-.4 1 0 2 .1 3 .4 2.3-1.6 3.3-1.3 3.3-1.3.7 1.5.2 2.6.1 2.9.8 1 1.3 2.1 1.3 3.4 0 4.8-2.8 5.9-5.5 6.2.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/abdullahaazzahur.giyas"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3">
          <div className="relative w-full lg:h-48 h-96 rounded shadow sm:h-auto">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://i.ibb.co/c1dTRp2/459216252-1492857254695253-6783292354464325140-n.jpg"
              alt="Md Abumahid Islam (Maruf)"
            />
          </div>
          <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
            <p className="text-lg font-bold">{t("md_abumahid_islam_maruf")}</p>
            <p className="mb-4 text-xs text-gray-800">{t("maruf_developer")}</p>
            <p className="mb-4 text-sm tracking-wide text-gray-800">
              {t("maruf_description")}
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/Abdullah-Az-Zahur"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M12 .297c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.7-4.1-1.7-.6-1.4-1.4-1.7-1.4-1.7-1.2-.8 0-.8 0-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.4 1.4 4.2 1.1.1-.9.5-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.4.1-2.9 0 0 1-.3 3.3 1.3 1-.3 2-.4 3-.4 1 0 2 .1 3 .4 2.3-1.6 3.3-1.3 3.3-1.3.7 1.5.2 2.6.1 2.9.8 1 1.3 2.1 1.3 3.4 0 4.8-2.8 5.9-5.5 6.2.5.4.9 1.2.9 2.3v3.4c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100027753881743"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
