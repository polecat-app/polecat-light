import { Pressable, StyleSheet, Text, View } from "react-native";
import textStyles from "../../styles/TextStyles";

interface FlatButtonProps {
  children: string;
  onPress: () => void;
}

function FlatButton({ children, onPress }: FlatButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText, textStyles.basicAccentBold]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
  },
});
