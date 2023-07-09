import { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { AnimalCard, AnimalCardSkeleton } from "./AnimalCard";
import { Offsets } from "../styles/Offsets";
import { getSpecies, getSpeciesBySearch } from "../api/Animals";
import { LocationContext } from "../provider/LocationProvider";
import { getSavedSpecies } from "../api/Saving";
import { SaveTypes } from "../util/Constants";
import { useTranslation } from "react-i18next";
import { useIsFocused, useNavigation } from "@react-navigation/native";

interface AnimalFlatListProps {
  timeOutValue: number;
  filterTags?: StaticTags[] | undefined;
  saveType?: SaveTypes | undefined;
  searchPhrase?: string | undefined;
}

function AnimalFlatList({
  timeOutValue,
  filterTags,
  saveType,
  searchPhrase,
}: AnimalFlatListProps) {
  // State
  const pageSize = 10;
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<animalProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filtersUpdating, setFiltersUpdating] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const locationContext = useContext(LocationContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<animalProps> | null>(null)
  const [tabPressCount, setTabPressCount] = useState<number>(0);

  const toTop = () => {
    if (flatListRef && flatListRef.current && flatListRef.current.scrollToOffset) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  // Set tab press count to 0 if component focus changes
  useEffect(() => {
    if (!isFocused) {
      setTabPressCount(0)
    }
  }, [isFocused])

  // Add tab press count if tab is clicked
  useEffect(() => {
    // @ts-ignore
    const unsubscribe = navigation.getParent().addListener("tabPress", (route) => {
      setTabPressCount(tabPressCount + 1)
    });
    return unsubscribe;
    // @ts-ignore
  }, [navigation.getParent().addListener(), tabPressCount])

  // If tab pressed twice while in focus, refresh flatlist
  useEffect(() => {
    if (tabPressCount > 1) {
      onRefresh()
    }
  }, [tabPressCount])

  const { i18n } = useTranslation();
  // @ts-ignore
  const language: Language = i18n.language;

  // Update results on change in filters, after timeout
  useEffect(() => {
    !filtersUpdating && setFiltersUpdating(true);
    const delayDebounceFn = setTimeout(() => {
      setPage(0);
      setFiltersUpdating(false);
    }, timeOutValue);
    return () => clearTimeout(delayDebounceFn);
  }, [filterTags, saveType, searchPhrase, locationContext.region, language]);

  // Fetch data on page change
  useEffect(() => {
    if (!filtersUpdating) {
      fetchData();
    }
  }, [page, filtersUpdating]);

  const fetchData = async () => {
    setIsLoading(true);

    // Search species
    if (searchPhrase) {
      getSpeciesBySearch(
        {
          language: language,
          search_prompt: searchPhrase,
          range_from: page * pageSize,
          range_to: page * pageSize + pageSize,
        },
        setData
      );
    }

    // Get filtered ecoregion species
    else if (filterTags && locationContext.region) {
      getSpecies(
        {
          language: language,
          eco_code: locationContext.region.eco_code,
          range_from: page * pageSize,
          range_to: page * pageSize + pageSize,
          filter_tags: filterTags,
        },
        setData
      );
    }

    // Get saved species
    else if (saveType) {
      getSavedSpecies(
        {
          language: language,
          save_type: saveType,
          range_from: page * pageSize,
          range_to: page * pageSize + pageSize,
        },
        setData
      );
    }

    // Get all species
    const newAnimals: animalProps[] = [];
    if (page === 0) {
      setData(newAnimals);
    } else {
      setData((data) => [...data, ...newAnimals]);
    }
    setIsLoading(false);
  };

  const fetchMoreData = () => {
    if (!isLoading) {
      setPage((page) => page + 1);
    }
  };

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onRefresh = async () => {
    toTop()
    setIsRefreshing(true);
    await timeout(timeOutValue);
    setPage(() => 0);
    setIsRefreshing(false);
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  };

  return filtersUpdating ? (
    <ScrollView style={styles.scrollViewContainer}>
      {[...Array(10).keys()].map((item) => (
        <AnimalCardSkeleton key={item} />
      ))}
    </ScrollView>
  ) : (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item: animalProps) => item.species_id.toString()}
      contentContainerStyle={styles.scrollViewContainer}
      renderItem={({ item }) => <AnimalCard key={item.species_id} {...item} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.2}
      onEndReached={fetchMoreData}
    />
  );
}

export default AnimalFlatList;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: Offsets.DefaultMargin,
    paddingBottom: Offsets.DefaultMargin,
  },
});
