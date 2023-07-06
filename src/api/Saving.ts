import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../InitSupabase";
import { SaveTypes } from "../util/Constants";

const saveList = async (key: string, list: number[]) => {
  try {
    const jsonString = JSON.stringify(list);
    await AsyncStorage.setItem(key, jsonString);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

const getList = async (key: string): Promise<number[] | null> => {
  try {
    const jsonString = await AsyncStorage.getItem(key);
    return jsonString != null ? JSON.parse(jsonString) : null;
  } catch (e) {
    // read error
    console.error(e);
    return null;
  }
};

const updateList = async (key: string, newItem: number) => {
  try {
    const list = await getList(key);
    const updatedList = list ? [...list, newItem] : [newItem];
    saveList(key, updatedList);
  } catch (e) {
    console.error(e);
  }
};

const removeItemFromList = async (key: string, itemToRemove: number) => {
  try {
    const list = await getList(key);
    if (!list) return;
    const updatedList = list.filter((item) => item !== itemToRemove);
    saveList(key, updatedList);
  } catch (e) {
    console.error(e);
  }
};

const isInList = async (key: string, numberToFind: number): Promise<boolean> => {
  try {
    const list = await getList(key);
    return list ? list.includes(numberToFind) : false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

async function saveAnimal(species_id: number, save_type: SaveTypes) {
  updateList(save_type, species_id);
}

async function unSaveAnimal(species_id: number, save_type: SaveTypes) {
  removeItemFromList(save_type, species_id);
}

async function isSavedAnimal(species_id: number, save_type: SaveTypes) {
  return isInList(save_type, species_id)
}

interface getSavedSpeciesProps {
  language: Language;
  save_type: SaveTypes;
  range_from: number;
  range_to: number;
}

async function getSavedSpecies(args: getSavedSpeciesProps, setData: Function) {
  // Get saved_ids from async storage
  const list = await getList(args.save_type);
  if (!list) {
    return;
  }
  const numbersAsString: string = list.join(",");

  const response = await supabase.rpc("__get_saved_species", {
    saved_ids: numbersAsString,
    language: args.language,
    range_from: args.range_from,
    range_to: args.range_to,
  });
  if (response && response.data) {
    setData((data: animalProps[]) => [...data, ...response.data]);
  }
}

export { saveAnimal, unSaveAnimal, isSavedAnimal, getSavedSpecies };
