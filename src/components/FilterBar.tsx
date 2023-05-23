import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MultipleSelectList from "./MultipleSelectList";
import { Colors } from "../styles/Colors";
import textStyles from "../styles/TextStyles";
import { Offsets } from "../styles/Offsets";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiscoverStackParamList } from "../types/navigation";
import { LocationContext } from "../provider/LocationProvider";
import { Tags } from "../util/Constants";

interface Props {
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelected: React.Dispatch<React.SetStateAction<StaticTags[]>>;
  selected: StaticTags[];
}

function FilterBar({ setClicked, setSelected, selected }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<DiscoverStackParamList>>();

  // Location context
  const locationContext = useContext(LocationContext);

  // Get all tags
  // @ts-ignore
  const allTags = Object.keys(Tags).map((tag: StaticTags) => ({ key: tag, value: tag }));

  // Navigate to the map location picker
  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity onPress={pickOnMapHandler} style={styles.inputfield}>
          <Ionicons
            style={{ marginRight: 5 }}
            name="location"
            size={15}
            color={Colors.AccentIcon}
          />
          <Text style={textStyles.basicAccentBold} numberOfLines={1}>
            {locationContext.locationName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setClicked(true);
          }}
        >
          <Ionicons
            style={styles.searchIcon}
            name="ios-search-outline"
            size={25}
            color={Colors.AccentIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <MultipleSelectList
          setSelected={(val: any) => setSelected(val)}
          data={allTags}
          save="value"
          onSelect={() => {}}
          label="Filters"
          placeholder="Select filters"
          maxHeight={285}
          selected={selected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: Offsets.LargeMargin,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputfield: {
    flex: 1,
    borderRadius: Offsets.BorderRadius,
    backgroundColor: Colors.AccentSecondary,
    flexDirection: "row",
    alignItems: "center",
    padding: Offsets.DefaultMargin,
  },
  searchIcon: {
    color: Colors.Secondary,
    marginLeft: Offsets.LargeMargin,
  },
  bookmarkIcon: {
    color: Colors.Secondary,
    marginLeft: Offsets.LargeMargin,
  },
});

export default FilterBar;
