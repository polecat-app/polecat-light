import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DiscoverStackParamList } from "../types/navigation";
import Tag from "../components/Tag";
import AnimalList from "../components/AnimalList";
import { getSpeciesDetails } from "../api/Animals";
import {
  getCoverImageURL,
  getThumbnailImageURLFromFileName,
} from "../api/Images";
import { SaveTypes } from "../util/Constants";
import { saveAnimal, unSaveAnimal } from "../api/Saving";

type AnimalScreenProps = NativeStackScreenProps<
  DiscoverStackParamList,
  "Animal"
>;

function AnimalScreen({ navigation, route }: AnimalScreenProps) {
  const props = route.params;
  const offset = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get("window").width;

  const [liked, setLiked] = useState(props.liked);
  const [seen, setSeen] = useState(props.seen);

  const [imageURL, setImageURL] = useState<string | undefined>(undefined);

  const [speciesDetails, setSpeciesDetails] = useState<animalDetails>({
    species_id: null,
    description: null,
    cover_url: null,
    range_image_url: null,
  });

  useEffect(() => {
    getCoverImageURL(props.species_id, setImageURL);
  }, []);

  useEffect(() => {
    getSpeciesDetails(props.species_id, setSpeciesDetails);
  }, []);

  function onPressLike() {
    if (liked) {
      unSaveAnimal(props.species_id, SaveTypes.liked);
    } else {
      saveAnimal(props.species_id, SaveTypes.liked);
    }
    setLiked(!liked);
  }

  function onPressSeen() {
    if (seen) {
      unSaveAnimal(props.species_id, SaveTypes.seen);
    } else {
      saveAnimal(props.species_id, SaveTypes.seen);
    }
    setSeen(!seen);
  }

  const headerHeight = offset.interpolate({
    inputRange: [windowWidth - 120, windowWidth - 80],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {/* Animated top bar */}
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 5,
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 25,
          padding: Offsets.DefaultMargin,
          backgroundColor: Colors.AccentPrimary,
          opacity: headerHeight,
        }}
      >
        <View style={{ height: 28 }}></View>
      </Animated.View>

      {/* Top bar content */}
      <View style={styles.row}>
        <Pressable
          onPress={() =>
            navigation.navigate("List", { selectedLocation: null })
          }
        >
          <Ionicons
            name={"arrow-back-outline"}
            size={28}
            style={styles.close}
          />
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={onPressLike}>
            <Ionicons
              name={liked ? "heart-circle" : "heart-outline"}
              size={28}
              style={liked ? styles.like : styles.unLike}
            />
          </Pressable>
          <Pressable onPress={onPressSeen}>
            <Ionicons
              name={seen ? "checkmark-circle" : "checkmark-outline"}
              size={28}
              style={seen ? styles.seen : styles.unSeen}
            />
          </Pressable>
        </View>
      </View>

      {/* Animal content */}
      <ScrollView
        style={styles.background}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Top Image and name*/}
        <View style={styles.top}>
          <ImageBackground
            style={styles.image}
            source={{ uri: imageURL }}
            onError={() => {
              getThumbnailImageURLFromFileName(
                props.thumbnail_name,
                setImageURL
              );
            }}
          />
          <View style={styles.onImage}>
            <Text style={textStyles.overlayBold} numberOfLines={3}>
              {props.common_name || props.genus + " " + props.species}
            </Text>
          </View>
        </View>

        {/* Description Text */}
        <View style={styles.description}>
          <Text
            style={[textStyles.basicItalic, styles.descriptionItem]}
            numberOfLines={3}
          >
            {props.genus + " " + props.species}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {props.tags.map((item) => {
              return (
                <View style={styles.descriptionItem} key={item}>
                  <Tag tagName={item}></Tag>
                </View>
              );
            })}
          </View>
          <Text style={styles.header}>Summary</Text>
          <Text style={[textStyles.basic, styles.descriptionItem]}>
            {speciesDetails.description}
          </Text>
          <Text style={styles.header}>Range</Text>
          <Image
            resizeMode={"contain"}
            style={styles.rangeImage}
            source={{
              uri:
                speciesDetails.range_image_url !== null
                  ? speciesDetails.range_image_url
                  : "",
            }}
          />

          <Text style={styles.header}>Similar animals</Text>
        </View>
        <AnimalList speciesId={props.species_id} listLength={5}></AnimalList>
      </ScrollView>
    </View>
  );
}

const gap = 25;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 8,
    paddingTop: 25,
    paddingBottom: Offsets.DefaultMargin,
  },
  background: {
    flex: 1,
    width: "100%",
  },
  top: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 500,
  },
  onImage: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "column",
    zIndex: 5,
    position: "absolute",
    padding: Offsets.DefaultMargin,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: Colors.Tertiary,
  },
  rangeImage: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    backgroundColor: Colors.Primary,
  },
  description: {
    paddingTop: 5,
    paddingBottom: Offsets.LargeMargin,
    padding: 20,
    flexDirection: "column",
    flex: 1,
    paddingVertical: gap / -2,
    backgroundColor: Colors.Primary,
  },
  descriptionItem: {
    marginTop: Offsets.DefaultMargin,
  },
  header: {
    ...textStyles.header,
    marginTop: Offsets.LargeMargin,
  },
  buttonSet: {
    width: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flex: 1,
  },
  close: {
    marginLeft: Offsets.DefaultMargin,
    color: Colors.AccentIcon,
  },
  like: {
    marginRight: Offsets.DefaultMargin,
    color: Colors.AccentTertiary,
  },
  unLike: {
    marginRight: Offsets.DefaultMargin,
    color: Colors.AccentIcon,
  },
  seen: {
    marginRight: Offsets.DefaultMargin,
    color: Colors.AccentSecondary,
  },
  unSeen: {
    marginRight: Offsets.DefaultMargin,
    color: Colors.AccentIcon,
  },
  closeFade: {
    color: Colors.Primary,
  },
  scrollViewContainer: {
    paddingHorizontal: Offsets.DefaultMargin,
    paddingBottom: Offsets.DefaultMargin,
    backgroundColor: Colors.Secondary,
  },
});

export default AnimalScreen;
