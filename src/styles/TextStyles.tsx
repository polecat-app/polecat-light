import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

const textStyles = StyleSheet.create({
  // Basic
  basic: {
    color: Colors.Text,
    lineHeight: 20,
    fontSize: 14
  },
  basicBold: {
    fontWeight: "bold",
    color: Colors.Text,
    lineHeight: 20,
    fontSize: 14
  },
  header: {
    fontWeight: "bold",
    color: Colors.Text,
    lineHeight: 25,
    fontSize: 18,
  },
  basicItalic: {
    fontStyle: "italic",
    color: Colors.TextSecondary,
    lineHeight: 20,
    fontSize: 14
  },

  // Accent
  basicAccent: {
    color: Colors.AccentText,
    fontWeight: "300",
  },
  basicAccentBold: {
    fontWeight: "bold",
    color: Colors.AccentText,
    lineHeight: 20,
    flexShrink: 1,
    ellipsizeMode: "tail",
    fontSize: 14
  },
  basicAccentItalic: {
    fontStyle: "italic",
    color: Colors.AccentText,
  },

  // Overlay
  overlayBold: {
    fontWeight: "bold",
    color: Colors.AccentText,
    fontSize: 25,
  },

  // Search
  searchAccentBold: {
    fontWeight: "bold",
    color: Colors.AccentText,
    height: 20,
    fontSize: 14
  },
});

export default textStyles;
