import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import the translation files
import en from "./en.json";
import bn from "./bn.json";
import es from "./es.json";
import ar from "./ar.json";

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      bn: {
        translation: bn,
      },
      es: {
        translation: es,
      },
      ar: {
        translation: ar,
      }
    },
    lng: localStorage.getItem("i18nextLng") || "en", // Read the saved language or default to English
    fallbackLng: "en", // Default language if none is detected

    supportedLngs: ["en", "bn", "es","ar"],

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
