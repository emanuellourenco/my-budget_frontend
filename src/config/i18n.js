import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../resources/translations/en.json";
import translationPT from "../resources/translations/pt.json";

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

export const langOptions = ["en", "pt"];

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  // debug: true,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
