import React from 'react';
import { View, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../util/Constants';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
  };

  return (
    <View>
      <RNPickerSelect
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
