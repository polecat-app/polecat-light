import { useContext, useEffect, useState } from "react";
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
import {
  getSpecies,
  getSpeciesBySearch,
} from "../api/Animals";
import { LocationContext } from "../provider/LocationProvider";
import { getSavedAnimals } from "../api/Saving";
import { SaveTypes } from "../util/Constants";
import { useTranslation } from "react-i18next";

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
  }, [filterTags, saveType, searchPhrase, locationContext.region]);

  // Fetch data on page change
  useEffect(() => {
    if (!filtersUpdating) {
      fetchData();
    }
  }, [page, filtersUpdating]);

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);

    // Search species
    if (searchPhrase) {
      getSpeciesBySearch(
        {
          language: language,
          search_term: searchPhrase,
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
      getSavedAnimals(
        saveType,
        page * pageSize,
        page * pageSize + pageSize,
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
