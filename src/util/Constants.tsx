const Bars = {
  FilterBar: "FilterBar",
  SearchBar: "SearchBar",
  SavedBar: "SavedBar",
};

const IconTypes = {
  email: "mail-outline.png",
  password: "key-outline.png",
  search: "search-outline.png",
};

const alerts = {
  location:
    "Please grant location permissions to this app, or select location manually.",
};

enum SaveTypes {
  liked = "liked",
  seen = "seen",
}

const Tags: TagsType = {
  amphibian: {
    color: "darkturquoise",
    icon: "water-opacity",
    category: "class",
  },
  bird: { color: "lightpink", icon: "bird", category: "class" },
  mammal: { color: "sandybrown", icon: "paw", category: "class" },
  reptile: { color: "darkseagreen", icon: "snake", category: "class" },
  vulnerable: {
    color: "lightcoral",
    icon: "record-circle-outline",
    category: "commonness",
  },
  endangered: {
    color: "firebrick",
    icon: "exclamation-thick",
    category: "commonness",
  },
  endemic: { color: "gold", icon: "map-marker-star-outline" },
  migratory: { color: "skyblue", icon: "earth" },
  nocturnal: { color: "slategray", icon: "moon-waning-crescent" },
  poisonous: { color: "plum", icon: "skull-outline" },
};

export { Bars, IconTypes, alerts, Tags, SaveTypes };
