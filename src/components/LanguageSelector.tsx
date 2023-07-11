import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../util/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import RadioGroup from "react-native-radio-buttons-group";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  async function changeLanguage(language: Language) {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem("language", language);
  }

  return (
    <View style={styles.containerStyle}>
      <RadioGroup
        radioButtons={LANGUAGES.map(({ value, flag }) => ({
          id: value, // acts as primary key, should be unique and non-empty string
          label: `${value.charAt(0).toUpperCase() + value.slice(1)}`,
          value: value,
          labelStyle: textStyles.basic,
          descriptionStyle: textStyles.basic,
          color: Colors.Inactive,
        }))}
        //@ts-ignore
        onPress={(selectedItem) => changeLanguage(selectedItem)}
        selectedId={i18n.language}
        containerStyle={styles.generalStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center", // Adding justifyContent: 'center' to center the button vertically
    marginVertical: Offsets.DefaultMargin,
  },
  generalStyle: {
    padding: 0,
    margin: 0,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  selectedStyle: {
    padding: 0,
    margin: 0,
    backgroundColor: Colors.Primary,
    height: 20,
  },
});

export default LanguageSelector;
