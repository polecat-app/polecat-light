import React, { useState } from "react";
import { View } from "react-native";
import TopBarContainer from "../../components/TopBarContainer";
import SavedBar from "../../components/SavedBar";
import AnimalFlatList from "../../components/AnimalFlatList";
import { SaveTypes } from "../../util/Constants";

function ListScreen() {

  // Saved states
  const [savedFilterState, setSavedFilterState] = useState<string | null>("Liked");

  return (
    <View style={{ flexDirection: "column", width: "100%", flex: 1 }}>
      <TopBarContainer title="Saved animals">
        <SavedBar setSavedFilterState={setSavedFilterState}></SavedBar>
      </TopBarContainer>
      <AnimalFlatList
        timeOutValue={500}
        saveType={savedFilterState == 'Liked'? SaveTypes.liked : SaveTypes.seen}
      ></AnimalFlatList>
    </View>
  );
}

export default ListScreen;
