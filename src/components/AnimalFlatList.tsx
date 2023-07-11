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
  // States
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<animalProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filtersUpdating, setFiltersUpdating] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const locationContext = useContext(LocationContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<animalProps> | null>(null);
  const [tabPressCount, setTabPressCount] = useState<number>(0);
  const { i18n } = useTranslation();

  // Vars
  // @ts-ignore
  const language: Language = i18n.language;
  const pageSize = 10;

  // TAB PRESS

  // Set tab press count to 0 if component focus changes
  useEffect(() => {
    if (!isFocused) {
      setTabPressCount(0);
    }
  }, [isFocused]);

  useEffect(() => {
    //@ts-ignore
    const unsubscribe = navigation.getParent().addListener("tabPress", () => {
      setTabPressCount((prev) => prev + 1);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (tabPressCount >= 2 && isFocused) {
      onRefresh();
      setTabPressCount(0);
    }
  }, [tabPressCount, isFocused]);

  // Update results on change in filters, after timeout
  useEffect(() => {
    !filtersUpdating && setFiltersUpdating(true); // Activate skeleton list
    const delayDebounceFn = setTimeout(() => {
      setData([]); // Clear data
      setPage(() => {
        const newPage = 0; // Move to first page
        fetchData(newPage); // Fetch new data
        return newPage;
      });
      setFiltersUpdating(false); // Deactivate skeleton list
    }, timeOutValue);
    return () => clearTimeout(delayDebounceFn);
  }, [filterTags, saveType, searchPhrase, locationContext.region, language]);

  // Fetch data and add to data state
  const fetchData = async (page: number) => {
    setIsLoading(true);
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
    } else if (filterTags && locationContext.region) {
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
    } else if (saveType) {
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
    setIsLoading(false);
  };

  // If end of flatlist reached, try to fetch more data
  const fetchMoreData = () => {
    if (!isLoading) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        fetchData(newPage);
        return newPage;
      });
    }
  };

  // Timeout function
  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Navigate to top of list
  const toTop = () => {
    if (
      flatListRef &&
      flatListRef.current &&
      flatListRef.current.scrollToOffset
    ) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  // On pull down
  const onRefresh = async () => {
    toTop();
    setIsRefreshing(true);
    await timeout(timeOutValue);
    setFiltersUpdating(true)
    await timeout(timeOutValue / 2);
    setData([]); // Clear data
    setPage(() => {
      const newPage = 0;
      fetchData(newPage);
      return newPage;
    });
    setIsRefreshing(false);
    setFiltersUpdating(false)
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
