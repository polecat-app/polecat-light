import { supabase } from "../InitSupabase";

async function getRegionFromLocation(locaction: location, language: Language, setRegion: Function) {
  const response = await supabase.rpc("__get_ecoregion_from_location", {
    ...locaction,
    language: language,
  });
  if (
    response &&
    response.data &&
    // @ts-ignore
    response.data.eco_code &&
    // @ts-ignore
    response.data.ecoregion_name
  ) {
    // @ts-ignore
    const eco_code = response.data.eco_code;
    // @ts-ignore
    const ecoregion_name = response.data.ecoregion_name;
    setRegion({ eco_code: eco_code, name: ecoregion_name });
  } else {
    setRegion(null);
  }
}

export { getRegionFromLocation };
