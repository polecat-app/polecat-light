import { Pressable, StyleSheet, Text } from "react-native";
import textStyles from "../styles/TextStyles";

interface CloseButtonProps {
  closeFunction: () => void;
}

function CloseButton({ closeFunction }: CloseButtonProps) {
  return (
    <Pressable
      style={styles.closeButton}
      onPress={() => {
        closeFunction();
      }}
    >
      <Text style={textStyles.basicAccentBold}>Close</Text>
    </Pressable>
  );
}

export default CloseButton;

const styles = StyleSheet.create({
  closeButton: {
    flexDirection: "column",
    alignItems: "center",
    width: "20%",
  },
});
