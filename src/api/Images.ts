import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../InitSupabase";

async function getThumbnailSignedURL(speciesId: number, setData: Function) {
  const cachedUrlData = await AsyncStorage.getItem(`signedUrlThumbnail_${speciesId}`);
  
  if (cachedUrlData) {
    const { url, expiryTime } = JSON.parse(cachedUrlData);
    
    // Check if the signed URL is still valid
    if (Date.now() < expiryTime) {
      setData(url);
      return;
    }
  }
  
  // Generate a new signed URL if no valid cached URL is available
  const response = await supabase.storage.from("thumbnails").createSignedUrl(`${speciesId}.jpg`, 31536000);

  if (response && response.data) {
    const url: string = response.data.signedURL;

    // Save the signed URL and its expiry time to AsyncStorage
    const expiryTime = Date.now() + 31536000 * 1000; // The URL expires in 31536000 seconds
    await AsyncStorage.setItem(`signedUrlThumbnail_${speciesId}`, JSON.stringify({ url, expiryTime }));
    
    setData(url);
  }
}


async function getRangeSignedURL(speciesId: number, setData: Function) {
  const cachedUrlData = await AsyncStorage.getItem(`signedUrlRange_${speciesId}`);
  
  if (cachedUrlData) {
    const { url, expiryTime } = JSON.parse(cachedUrlData);
    
    // Check if the signed URL is still valid
    if (Date.now() < expiryTime) {
      setData(url);
      return;
    }
  }
  
  // Generate a new signed URL if no valid cached URL is available
  const response = await supabase.storage.from("range").createSignedUrl(`${speciesId}.jpg`, 31536000);

  if (response && response.data) {
    const url: string = response.data.signedURL;

    // Save the signed URL and its expiry time to AsyncStorage
    const expiryTime = Date.now() + 31536000 * 1000; // The URL expires in 31536000 seconds
    await AsyncStorage.setItem(`signedUrlRange_${speciesId}`, JSON.stringify({ url, expiryTime }));
    
    setData(url);
  }
}

export { getThumbnailSignedURL, getRangeSignedURL };
