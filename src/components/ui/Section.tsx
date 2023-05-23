import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../styles/Colors";
import { ReactNode } from "react";
import { Offsets } from "../../styles/Offsets";
import textStyles from "../../styles/TextStyles";

interface SectionButtonProps {
  icon: string,
  iconColor?: string,
  children: ReactNode,
  onPress?: () => void,
  isLast?: boolean, // new prop
}

function SectionButton({ icon, iconColor, children, onPress, isLast }: SectionButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.row, isLast && styles.lastRow]}>
      <Ionicons
        style={{ marginRight: 5 }}
        // @ts-ignore
        name={icon}
        size={20}
        color={iconColor? iconColor : Colors.Inactive}
      />
  <Text style={[textStyles.basic, styles.text]}>{children}</Text>
</TouchableOpacity>
  );
}

interface SectionRowProps {
  icon: string,
  children: ReactNode,
  isLast?: boolean, // new prop
}

function SectionRow({ icon, children, isLast }: SectionRowProps) {
  return (
    <View style={[styles.row, isLast && styles.lastRow]}>
      <Ionicons
        style={{ marginRight: 5 }}
        // @ts-ignore
        name={icon}
        size={20}
        color={Colors.Inactive}
      />
  <Text style={[textStyles.basic, styles.text]}>{children}</Text>
</View>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={[textStyles.basicBold, styles.text]}>{title}</Text>
      <View style={styles.box}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    paddingHorizontal: Offsets.DefaultMargin,
    paddingBottom: Offsets.DefaultMargin,
    marginTop: Offsets.LargeMargin,
  },
  box: {
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: Offsets.BorderRadius / 2,
    padding: Offsets.DefaultMargin,
    marginTop: Offsets.DefaultMargin,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  text: {
    marginLeft: 10,
  },
});

export { Section, SectionButton, SectionRow };
