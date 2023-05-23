import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import React from "react";
import { View } from "react-native";
import TopBarContainer from "../components/TopBarContainer";
import { Section, SectionButton, SectionRow } from "../components/ui/Section";

function AccountScreen() {
  return (
    <View style={styles.container}>
      <TopBarContainer title="Account" />
      <ScrollView style={styles.scrollView}>
        <Section title="Details">
          <SectionRow icon="mail-outline">
            email
          </SectionRow>
          <SectionRow
            icon="calendar-outline"
            isLast={true}
          >
            date
          </SectionRow>
        </Section>
        <Section title="Actions">
          <SectionButton
            icon="log-out-outline"
            onPress={() => {}}
          >
            Logout
          </SectionButton>
          <SectionButton
            icon="trash-outline"
            iconColor={Colors.Error}
            onPress={() => {}}
            isLast={true}
          >
            Delete account
          </SectionButton>
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
