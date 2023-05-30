import { SQLTransaction } from "expo-sqlite";
import db from "../InitSqlite";
import { convertBooleansToTags, convertTagsToBooleans } from "../util/Helpers";
import { tagNames } from "../util/Constants";

interface getSpeciesProps {
  eco_code: string | null;
  range_from: number;
  range_to: number;
  filter_tags: StaticTags[];
}

// Get species by ecoregion and filter tags

async function getSpecies(args: getSpeciesProps, setData: Function) {
  // Unpack filter tags
  const filterBools = convertTagsToBooleans(args.filter_tags);

  const database = await db;
  console.log(database);
  database.transaction((tx: SQLTransaction) => {
    tx.executeSql(
      `
WITH params_cte(
  eco_code,
  range_to,
  range_from,
  amphibian,
  bird,
  mammal,
  reptile,
  vulnerable,
  endangered,
  migratory,
  nocturnal,
  poisonous,
  endemic
) AS (
  SELECT 
  ?, -- eco_code
  ?, -- range_to
  ?, -- range_from
  ?, -- amphibian
  ?, -- bird
  ?, -- mammal
  ?, -- reptile
  ?, -- vulnerable
  ?, -- endangered
  ?, -- migratory
  ?, -- nocturnal
  ?, -- poisonous
  ? -- endemic
)
SELECT 
s.species_id AS species_id,
sn.english AS common_name,
g.genus AS genus,
s.species AS species,
s.thumbnail AS thumbnail,
SUM(CASE WHEN sv.save_type = 'liked' THEN 1 ELSE 0 END) > 0 AS liked,
SUM(CASE WHEN sv.save_type = 'seen' THEN 1 ELSE 0 END) > 0 AS seen,
st.amphibian AS amphibian,
st.bird AS bird,
st.mammal AS mammal,
st.reptile AS reptile,
st.vulnerable AS vulnerable,
st.endangered AS endangered,
st.migratory AS migratory,
st.nocturnal AS nocturnal,
st.poisonous AS poisonous,
es.endemic AS endemic
FROM species s
LEFT JOIN genus g ON s.genus_id = g.genus_id
LEFT JOIN species_name_map snm ON snm.species_id = s.species_id
LEFT JOIN species_name sn ON snm.fts_rowid = sn.rowid
LEFT JOIN saved sv ON s.species_id = sv.species_id
LEFT JOIN species_tags st ON s.species_id = st.species_id
LEFT JOIN ecoregion_species es ON s.species_id = es.species_id
CROSS JOIN params_cte p
WHERE 
(p.eco_code IS NULL OR es.eco_code = p.eco_code) AND
(p.endemic IS NULL OR p.eco_code IS NULL OR es.endemic = p.endemic) AND (
  (p.amphibian IS NULL OR st.amphibian = p.amphibian) AND
  (p.bird IS NULL OR st.bird = p.bird) AND
  (p.mammal IS NULL OR st.mammal = p.mammal) AND
  (p.reptile IS NULL OR st.reptile = p.reptile) AND
  (p.vulnerable IS NULL OR st.vulnerable = p.vulnerable) AND
  (p.endangered IS NULL OR st.endangered = p.endangered) AND
  (p.migratory IS NULL OR st.migratory = p.migratory) AND
  (p.nocturnal IS NULL OR st.nocturnal = p.nocturnal) AND
  (p.poisonous IS NULL OR st.poisonous = p.poisonous)
)
GROUP BY s.species_id
ORDER BY 
      s.thumbnail DESC,
      s.ranking DESC,
      s.species_id
LIMIT (SELECT range_to - range_from FROM params_cte)
OFFSET (SELECT range_from FROM params_cte);
`,
      [args.eco_code, args.range_to, args.range_from, ...filterBools],
      (tx, response) => {
        if (response && response.rows._array) {
          const newData: animalProps[] = []
          // Loop through each response array dict
          response.rows._array.forEach((responseObject) => {

            // Get boolean tags from response object if key in tagNames
            const responseTags: StaticTags[] = Object.keys(responseObject).filter((key) => {
              return tagNames.includes(key) && responseObject[key] === 1;
            });

            // Add responseTags to response
            const newDataObj: animalProps = {
              species_id: responseObject.species_id,
              common_name: responseObject.common_name,
              genus: responseObject.genus,
              species: responseObject.species,
              thumbnail: responseObject.thumbnail,
              liked: responseObject.liked,
              seen: responseObject.seen,
              tags: responseTags
            }

            // Add response to newData
            newData.push(newDataObj);
          });
          setData((data: animalProps[]) => [...data, ...newData]);
        }
      },
      (tx, error) => {
        console.error("Error: ", error);
        return true; // Stop the transaction if there was an error
      }
    );
  });
}

// Get species by search term

interface searchProps {
  search_term: string;
  range_from: number;
  range_to: number;
}

async function getSpeciesBySearch(args: searchProps, setData: Function) {
  // const response = await supabase.rpc(
  //   "__search_animals",
  //   args
  // );
  const response = {};
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
  // const response = await supabase.rpc(
  //   "__get_related_species",
  //   args
  // );
  const response = {};
  if (response && response.data) {
    setData(response.data);
  }
}

// Get species details

async function getSpeciesDetails(species_id: number, setData: Function) {
  // const response = await supabase.rpc(
  //   "__get_species_details",
  //   { search_id: species_id }
  // )
  const response = {};
  if (response && response.data) {
    setData(response.data);
  }
}

export { getSpecies, getRelatedSpecies, getSpeciesDetails, getSpeciesBySearch };
