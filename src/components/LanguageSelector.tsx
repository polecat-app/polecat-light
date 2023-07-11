import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../util/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from 'react-native-select-dropdown'
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  async function changeLanguage(language: Language) {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem("language", language);
  }

  return (
    <View style={styles.containerStyle}>
      <SelectDropdown
        data={LANGUAGES.map(({ value, flag }) => (value))}
        defaultValue={i18n.language} // current language from i18n
        //@ts-ignore
        onSelect={(selectedItem) => changeLanguage(selectedItem)}
        buttonStyle={styles.selectedStyle}
        buttonTextStyle={{...textStyles.basic, textAlign: 'left'}} // Adding textAlign: 'left' to align text to the left
        dropdownStyle={styles.generalStyle}
        rowStyle={styles.generalStyle}
        rowTextStyle={textStyles.basic}
        selectedRowStyle={styles.generalStyle}
        selectedRowTextStyle={textStyles.basic}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center', // Adding justifyContent: 'center' to center the button vertically
    alignItems: 'center', // Adding alignItems: 'center' to center the button horizontally if needed
  },
  generalStyle: {
    padding: 0,
    margin: 0,
    borderRadius: Offsets.BorderRadius
  },
  selectedStyle: {
    padding: 0,
    margin: 0,
    backgroundColor: Colors.Primary,
    height: 20,
  }
});

export default LanguageSelector;
