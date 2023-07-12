import { supabase } from "../InitSupabase";

async function getAddressFromCoordinates(
  latitude: number,
  longitude: number,
  setLocationName: Function
) {
  const response = await supabase.functions.invoke("get-address-from-coords", {
    headers: {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    },
  });
  setLocationName(response?.data?.address);
}

export default getAddressFromCoordinates;
