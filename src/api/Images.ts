import { supabase } from "../InitSupabase";

async function getThumbnailSignedURL(
  speciesId: number,
  setData: Function
) {
  const response = await supabase.storage
    .from("thumbnails")
    .createSignedUrl(`${speciesId}.jpg`, 31536000);
  if (response && response.data) {
    const url: string = response.data.signedURL;
    setData(url);
  }
}

export { getThumbnailSignedURL };
