import React from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CloseButton from "./CloseButton";
import { Colors } from "../styles/Colors";
import TextStyles from "../styles/TextStyles";
import { Offsets } from "../styles/Offsets";

interface TopBarContainerProps {
  searchPhrase: string;
  setSearchPhrase: (text: string) => void;
  setClicked: Function;
}

function SearchBar({
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: TopBarContainerProps) {
  return (
    <View style={styles.row}>
      <View style={styles.searchBar}>
        <Ionicons
          name="ios-search"
          size={18}
          color={Colors.Primary}
          style={{ marginLeft: 1, opacity: 0.5 }}
        />
        <TextInput
          style={[
            TextStyles.searchAccentBold,
            styles.input,
            { opacity: searchPhrase.length ? 1 : 0.5 },
          ]}
          placeholder="Search"
          placeholderTextColor={Colors.Primary}
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          autoFocus={true}
          returnKeyType={"search"}
          onFocus={() => {
            setClicked(true);
          }}
        />

        <Ionicons
          name="ios-close"
          size={18}
          color={Colors.Primary}
          style={{ opacity: 0.5 }}
          onPress={() => {
            setSearchPhrase("");
          }}
        />
      </View>
      <CloseButton
        closeFunction={() => {
          Keyboard.dismiss();
          setClicked(false);
          setSearchPhrase("");
        }}
      ></CloseButton>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    padding: Offsets.DefaultMargin,
    flexDirection: "row",
    width: "80%",
    backgroundColor: Colors.AccentSecondary,
    borderRadius: Offsets.BorderRadius,
    alignItems: "center",
  },
  input: {
    marginLeft: Offsets.DefaultMargin,
    flex: 1,
    alignSelf: "center",
  },
});
