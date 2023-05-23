import { Pressable, StyleSheet, Text, View } from "react-native";
import { Offsets } from "../../styles/Offsets";
import { Colors } from "../../styles/Colors";

interface ButtonProps {
  children: string;
  onPress: () => void;
}

function Button({ children, onPress }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: Offsets.BorderRadius,
    paddingVertical: Offsets.DefaultMargin,
    paddingHorizontal: 12,
    backgroundColor: Colors.AccentSecondary,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
