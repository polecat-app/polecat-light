import { SaveTypes } from "../util/Constants";

async function saveAnimal(
  species_id: number, 
  save_type: SaveTypes
  ) {
    // await supabase.rpc(
    //   "__save_animal",
    //   { species_id: species_id, save_type: save_type }
    // )
    const response = {}
}

async function unSaveAnimal(
  species_id: number, 
  save_type: SaveTypes
  ) {
    // await supabase.rpc(
    //   "__unsave_animal",
    //   { species_id: species_id, save_type: save_type }
    // )
    const response = {}
}

async function getSavedAnimals(
  save_type: SaveTypes,
  range_from: number,
  range_to: number,
  setData: Function
  ) {
    // const response = await supabase.rpc(
    //   "__get_saved_animals",
    //   { save_type: save_type, range_from: range_from, range_to: range_to }
    // );
    const response = {}
    if (response && response.data) {
      setData((data: animalProps[]) => [...data, ...response.data]);
    }
}

export { saveAnimal, unSaveAnimal, getSavedAnimals };
