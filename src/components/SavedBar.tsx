import { View, StyleSheet } from "react-native";
// @ts-ignore
import SwitchSelector from "react-native-switch-selector";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";

function SavedBar({ setSavedFilterState }: { setSavedFilterState: Function }) {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.toggle}>
          <SwitchSelector
            initial={0}
            onPress={(value: string) => {
              setSavedFilterState(value);
            }}
            textStyle={textStyles.basicAccentBold}
            selectedTextStyle={{
              ...textStyles.basicAccentBold,
              color: Colors.AccentPrimary,
            }}
            borderColor={Colors.AccentPrimary}
            hasPadding
            buttonColor={Colors.Primary}
            backgroundColor={Colors.AccentSecondary}
            borderRadius={50}
            valuePadding={0}
            height={30}
            bold={true}
            options={[
              { label: "Liked", value: "Liked" },
              { label: "Seen", value: "Seen" },
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />
        </View>
        <View style={styles.inbetween}></View>
      </View>
    </View>
  );
}

export default SavedBar;

const styles = StyleSheet.create({
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggle: {
    width: "60%",
  },
  inbetween: {
    width: "20%",
  },
});
