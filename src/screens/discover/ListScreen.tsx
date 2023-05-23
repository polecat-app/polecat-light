import { useState } from "react";
import { View } from "react-native";
import TopBarContainer from "../../components/TopBarContainer";
import SearchBar from "../../components/SearchBar";
import FilterBar from "../../components/FilterBar";
import AnimalFlatList from "../../components/AnimalFlatList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DiscoverStackParamList } from "../../types/navigation";

type ListScreenProps = NativeStackScreenProps<DiscoverStackParamList, "List">;

function ListScreen({ route }: ListScreenProps) {
  // State
  const [selected, setSelected] = useState<StaticTags[]>([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <View style={{ flexDirection: "column", width: "100%", flex: 1 }}>
      <TopBarContainer title="Discover animals">
        {clicked && (
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            setClicked={setClicked}
          ></SearchBar>
        )}
        {!clicked && (
          <FilterBar
            selected={selected}
            setSelected={setSelected}
            setClicked={setClicked}
          />
        )}
      </TopBarContainer>
      <AnimalFlatList
        filterTags={selected}
        searchPhrase={searchPhrase}
        timeOutValue={1500}
      ></AnimalFlatList>
    </View>
  );
}

export default ListScreen;
