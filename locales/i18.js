import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import the translation files
import en from "./en.json";
import bn from "./bn.json";

i18n
  .use(LanguageDetector) // Automatically detect user's language preference
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      bn: {
        translation: bn,
      },
    },
    // Default language if nothing is detected or specified
    fallbackLng: "en",

    // List of languages to support
    supportedLngs: ["en", "bn"],

    // Set the language in the local storage or use the detected one
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
