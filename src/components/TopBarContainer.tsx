import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import { ReactNode } from "react";
import textStyles from "../styles/TextStyles";

interface TopBarContainerProps {
  title: string;
  backgroundColor?: string;
  children?: ReactNode;
}

function TopBarContainer({
  title,
  backgroundColor = Colors.AccentPrimary,
  children,
}: TopBarContainerProps): JSX.Element {
  return (
    <View style={[styles.barContainer, { backgroundColor }]}>
      <Text style={[styles.row, textStyles.overlayBold]}>{title}</Text>
      {children}
    </View>
  );
}

export default TopBarContainer;

const styles = StyleSheet.create({
  barContainer: {
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%",
    padding: Offsets.LargeMargin,
  },
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
