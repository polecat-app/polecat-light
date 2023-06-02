import { supabase } from "../InitSupabase";

async function getThumbnailImageURLFromFileName(fileName: string, setData: Function) {
  const response = await supabase.storage.from('animal-images').createSignedUrl(fileName, 60000)
  if (response && response.data) {
    const url: string = response.data.signedURL;
    setData(url)
  }
}

async function getCoverImageURL(species_id: number, setData: Function) {

  // TODO: Get cover image url from species table
  const response = await supabase.from("species_images").select("*").eq("species_id", species_id)
  if (response && response.body && response.body[0]) {
    setData(response.body[0].cover_url);
  }
}

export { getThumbnailImageURLFromFileName, getCoverImageURL }