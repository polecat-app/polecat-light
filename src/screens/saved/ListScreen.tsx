import React, { useState } from "react";
import { View } from "react-native";
import TopBarContainer from "../../components/TopBarContainer";
import SavedBar from "../../components/SavedBar";
import AnimalFlatList from "../../components/AnimalFlatList";
import { SaveTypes } from "../../util/Constants";
import { useTranslation } from "react-i18next";

function ListScreen() {

  // Saved states
  const [savedFilterState, setSavedFilterState] = useState<string | null>("Liked");
  const { t } = useTranslation();

  return (
    <View style={{ flexDirection: "column", width: "100%", flex: 1 }}>
      <TopBarContainer title={t("saved animals")}>
        <SavedBar setSavedFilterState={setSavedFilterState}></SavedBar>
      </TopBarContainer>
      <AnimalFlatList
        timeOutValue={1500}
        saveType={savedFilterState == 'Liked'? SaveTypes.liked : SaveTypes.seen}
      ></AnimalFlatList>
    </View>
  );
}

export default ListScreen;
