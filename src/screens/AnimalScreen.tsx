import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ImageBackground,
  ScrollView,
  Animated,
  Dimensions,
  Image as ReactImage,
  Modal,
  Linking,
  TouchableOpacity,
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
import { SaveTypes } from "../util/Constants";
import { isSavedAnimal, saveAnimal, unSaveAnimal } from "../api/Saving";
import { useTranslation } from "react-i18next";
import { getRangeSignedURL } from "../api/Images";
import { Image } from "react-native-expo-image-cache";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AnimalScreenProps = NativeStackScreenProps<
  DiscoverStackParamList,
  "Animal"
>;

function AnimalScreen({ navigation, route }: AnimalScreenProps) {
  const props = route.params;
  const offset = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get("window").width;
  const [rangeURL, setRangeURL] = useState<string | null>(null);

  const [liked, setLiked] = useState<boolean>(false);
  const [seen, setSeen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [speciesDetails, setSpeciesDetails] = useState<animalDetails>({
    species_id: null,
    description: null,
    cover_url: undefined,
  });

  const { i18n, t } = useTranslation();
  // @ts-ignore
  const language: Language = i18n.language;

  const insets = useSafeAreaInsets();

  useEffect(() => {
    getSpeciesDetails(props.species_id, language, setSpeciesDetails);
    getRangeSignedURL(props.species_id, setRangeURL);
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

  async function updateSaved() {
    if (await isSavedAnimal(props.species_id, SaveTypes.liked)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    if (await isSavedAnimal(props.species_id, SaveTypes.seen)) {
      setSeen(true);
    } else setSeen(false);
  }

  useEffect(() => {
    updateSaved();
  }, []);

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
          paddingTop: insets.top + Offsets.DefaultMargin,
          paddingVertical: Offsets.LargeMargin,
          paddingBottom: Offsets.DefaultMargin,
          backgroundColor: Colors.AccentPrimary,
          opacity: headerHeight,
        }}
      >
        <View style={{ height: 28 }}></View>
      </Animated.View>

      {/* Top bar content */}
      <View
        style={[styles.row, { paddingTop: insets.top + Offsets.DefaultMargin }]}
      >
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
            source={{ uri: speciesDetails.cover_url }}
          />
          <View style={styles.onImage}>
            <Text style={textStyles.overlayBold} numberOfLines={3}>
              {props.common_name || props.genus + " " + props.species}
            </Text>
            {speciesDetails.cover_url && (
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Ionicons name={"expand-outline"} size={28} color="white" />
              </Pressable>
            )}
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                style={{ width: "100%", height: "100%" }}
                source={{ uri: speciesDetails.cover_url }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: insets.top + Offsets.DefaultMargin,
                  right: Offsets.DefaultMargin,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Ionicons name="contract-outline" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ position: "absolute", bottom: 10 }}
                onPress={() => {
                  if (speciesDetails.cover_url) {
                    Linking.openURL(speciesDetails.cover_url);
                  }
                }}
              >
                <Text style={{ color: "white" }}>
                  {speciesDetails.cover_url}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
          <Text style={styles.header}>{t("summary")}</Text>
          <Text style={[textStyles.basic, styles.descriptionItem]}>
            {speciesDetails.description}
          </Text>
          <Text style={styles.header}>{t("range")}</Text>
          {rangeURL ? (
            <Image style={styles.rangeImage} uri={rangeURL} />
          ) : (
            <ReactImage
              style={styles.rangeImage}
              source={require("../../assets/regions/world.jpg")}
            />
          )}

          <Text style={styles.header}>{t("similar animals")}</Text>
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
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
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
