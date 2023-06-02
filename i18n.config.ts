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

const getDefaultLang = async () => {
  // @ts-ignore
  const storedLang: Language = await AsyncStorage.getItem("language");
  return i18n.use(initReactI18next).init({
    resources,
    lng: storedLang ? storedLang : "english",
    //language to use if translations in user language are not available
    fallbackLng: "english",
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });
};

export default getDefaultLang();
