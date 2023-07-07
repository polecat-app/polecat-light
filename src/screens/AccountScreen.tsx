import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import React from "react";
import { View } from "react-native";
import TopBarContainer from "../components/TopBarContainer";
import { Section, SectionButton, SectionRow } from "../components/ui/Section";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { unSaveAllAnimals } from "../api/Saving";

function AccountScreen() {

  const { t } = useTranslation();

  const confirmDelete = () => {
    Alert.alert(
      "Confirmation", // Title of the confirmation window
      "Are you sure you want to delete all saved animals?", // Message in the confirmation window
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => unSaveAllAnimals() 
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TopBarContainer title={t('settings')} />
      <ScrollView style={styles.scrollView}>
        <Section title={t('actions')}>
          <SectionButton
            icon="trash-outline"
            iconColor={Colors.Error}
            onPress={confirmDelete}
            isLast={true}
          >
            {t('delete saved')}
          </SectionButton>
        </Section>
        <Section title={t('language')}>
          <LanguageSelector></LanguageSelector>
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: Colors.Primary,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    width: "100%",
  },
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginHorizontal: Offsets.DefaultMargin,
    marginTop: Offsets.DefaultMargin * 2,
    borderBottomColor: Colors.Secondary,
    borderBottomWidth: 2,
  },
  value: {
    marginHorizontal: Offsets.DefaultMargin * 2,
    marginTop: Offsets.DefaultMargin,
  },
  logoutButton: {
    width: "80%",
    height: 20,
  },
  button: {
    padding: Offsets.DefaultMargin,
    backgroundColor: Colors.AccentSecondary,
    marginHorizontal: Offsets.DefaultMargin,
    marginTop: Offsets.DefaultMargin * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Offsets.BorderRadius,
  },
});

export default AccountScreen;
