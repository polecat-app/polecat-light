import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import { ReactNode } from "react";
import textStyles from "../styles/TextStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.barContainer, { backgroundColor }]}>
      <Text
        style={[styles.row, textStyles.overlayBold, { marginTop: insets.top }]}
      >
        {title}
      </Text>
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
    paddingTop: Offsets.DefaultMargin,
    paddingBottom: Offsets.LargeMargin,
    paddingHorizontal: Offsets.LargeMargin,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
