import { supabase } from "../InitSupabase";
import { convertTagsToBooleans } from "../util/Helpers";

// Get species by ecoregion and filter tags

interface getSpeciesProps {
  language: Language;
  eco_code: string | null;
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
  language: Language;
  search_prompt: string;
  range_from: number;
  range_to: number;
}

async function getSpeciesBySearch(
  args: searchProps,
  setData: Function
) {
  const response = await supabase.rpc(
    "__search_species",
    args
  );
  if (response && response.data) {
    setData((data: animalProps[]) => [...data, ...response.data]);
  }
}

// Get related species

interface getRelatedSpeciesProps {
  language: Language;
  range_from: number;
  range_to: number;
  species_id: number;
  eco_code: string;
}

async function getRelatedSpecies(
  args: getRelatedSpeciesProps,
  setData: Function
) {
  const response = await supabase.rpc(
    "__get_related_species",
    {
      language: args.language,
      range_from: args.range_from,
      range_to: args.range_to,
      species_id_input: args.species_id,
      eco_code: args.eco_code
    }
  );
  if (response && response.data) {
    setData(response.data);
  }
}

// Get species details

async function getSpeciesDetails(
  species_id: number, 
  language: Language,
  setData: Function) {
    const response = await supabase.rpc(
      "__get_species_details",
      { species_id_input: species_id, language: language }
    )
    if (response && response.data) {
      setData(response.data);
    }
}


export { getSpecies, getRelatedSpecies, getSpeciesDetails, getSpeciesBySearch };
