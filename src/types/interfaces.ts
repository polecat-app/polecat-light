interface filterProps {
  commonName: string | null;
  tags: StaticTags[] | null;
  liked: boolean | null;
  seen: boolean | null;
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

type StaticTags =
  | "amphibian"
  | "bird"
  | "mammal"
  | "reptile"
  | "vulnerable"
  | "endangered"
  | "endemic"
  | "migratory"
  | "nocturnal"
  | "poisonous";

interface animalProps {
  species_id: number;
  common_name: string;
  genus: string;
  species: string;
  thumbnail_name: string;
  liked: boolean;
  seen: boolean;
  tags: StaticTags[];
}

interface animalDetails {
  species_id: number | null;
  description: string | null;
  cover_url: string | null;
  range_image_url: string | null;
}

interface location {
  latitude: number;
  longitude: number;
}

interface region {
  eco_code: string;
  name: string;
}

interface Tag {
  color: string;
  icon: string;
  category?: string;
}

type TagsType = {
  [K in StaticTags]: Tag;
};
