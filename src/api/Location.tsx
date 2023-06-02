import { supabase } from "../InitSupabase";

async function getAddressFromCoordinates(
  latitude: number,
  longitude: number,
  setLocationName: Function
) {
  console.log("Getting address from coordinates");
  const response = await supabase.functions.invoke("get-address-from-coords", {
    headers: {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    },
  });
  console.log("Response from get-address-from-coords", response);
  setLocationName(response.data.address);
}

export default getAddressFromCoordinates;
