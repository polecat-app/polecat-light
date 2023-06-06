import { supabase } from "../InitSupabase";
import { convertBooleansToTags, convertTagsToBooleans } from "../util/Helpers";

// Get species by ecoregion and filter tags

interface getSpeciesProps {
  language: Language;
  eco_code: string;
  range_from: number;
  range_to: number;
  filter_tags: StaticTags[];
}

async function getSpecies(
  args: getSpeciesProps,
  setData: Function
) {
  const booleanTags = convertTagsToBooleans(args.filter_tags)
  const response = await supabase.rpc(
    "__get_species",
    {
      language: args.language,
      eco_code: args.eco_code,
      range_from: args.range_from,
      range_to: args.range_to,
      ...booleanTags
    }
  );
  if (response && response.data) {
    setData((data: animalProps[]) => [...data, ...response.data]);
  }
}

// Get species by search term

interface searchProps {
  search_term: string;
  range_from: number;
  range_to: number;
}

async function getSpeciesBySearch(
  args: searchProps,
  setData: Function
) {
  const response = await supabase.rpc(
    "__search_animals",
    args
  );
  if (response && response.data) {
    setData((data: animalProps[]) => [...data, ...response.data]);
  }
}

// Get related species

interface getRelatedSpeciesProps {
  eco_code: string;
  range_from: number;
  range_to: number;
  species_id: number;
}

async function getRelatedSpecies(
  args: getRelatedSpeciesProps,
  setData: Function
) {
  const response = await supabase.rpc(
    "__get_related_species",
    args
  );
  if (response && response.data) {
    setData(response.data);
  }
}

// Get species details

async function getSpeciesDetails(
  species_id: number, 
  setData: Function) {
    const response = await supabase.rpc(
      "__get_species_details",
      { search_id: species_id }
    )
    if (response && response.data) {
      setData(response.data);
    }
}


export { getSpecies, getRelatedSpecies, getSpeciesDetails, getSpeciesBySearch };
