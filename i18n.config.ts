import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishTranslation from "./translations/english.json";
import dutchTranslation from "./translations/dutch.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  compatibilityJSON: 'v3',
  resources,
  lng: "english", // Default to English
  fallbackLng: "english",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    useSuspense:false,
  },
});

const setLanguage = async () => {
  // @ts-ignore
  const storedLang: Language = await AsyncStorage.getItem("language");
  const languageToSet = storedLang ? storedLang : "english";
  i18n.changeLanguage(languageToSet);
}

setLanguage();

export default i18n;
