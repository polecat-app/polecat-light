import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishTranslation from './translations/english.json';
import dutchTranslation from './translations/dutch.json';


//empty for now
const resources = {
  english: {
    translation: englishTranslation,
  },
  dutch: {
    translation: dutchTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "english",
  //language to use if translations in user language are not available
  fallbackLng: "english",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;