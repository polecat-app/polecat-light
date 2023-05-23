import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AnimalCard, AnimalCardSkeleton } from "./AnimalCard";
import { Offsets } from "../styles/Offsets";
import { getRelatedSpecies } from "../api/Animals";
import { LocationContext } from "../provider/LocationProvider";

interface AnimalListProps {
  speciesId: number;
  listLength: number;
}

function AnimalList({
  speciesId,
  listLength,
}: AnimalListProps) {
  const [data, setData] = useState<animalProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locationContext = useContext(LocationContext);

  async function fetchData() {
    setIsLoading(true);
    if (locationContext.region) {
      getRelatedSpecies({
        eco_code: locationContext.region?.eco_code, 
        range_from: 0, 
        range_to: 5, 
        species_id: speciesId
      }, setData)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [locationContext.region, speciesId]);

  return isLoading ? (
    <ScrollView style={styles.scrollViewContainer}>
      {[...Array(listLength).keys()].map((item) => (
        <AnimalCardSkeleton key={item} />
      ))}
    </ScrollView>
  ) : (
    <ScrollView style={styles.scrollViewContainer}>
      {data.map((item) => (
        <AnimalCard key={item.species_id} {...item} />
      ))}
    </ScrollView>
  );
}

export default AnimalList;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: Offsets.DefaultMargin,
    paddingBottom: Offsets.DefaultMargin,
  },
});
