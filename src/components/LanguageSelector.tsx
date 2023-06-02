import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../util/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  async function changeLanguage (language: Language) {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem('language', language);
  };

  return (
    <View>
      <RNPickerSelect
        value={i18n.language} // current language from i18n
        onValueChange={(value) => changeLanguage(value)}
        items={LANGUAGES.map(({ value, flag }) => ({
          label: `${flag} ${value}`,
          value,
        }))}
      />
    </View>
  );
};

export default LanguageSelector;
