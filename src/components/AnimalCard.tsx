import { CommonActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import Skeleton from "./Skeleton";
import Tag from "./Tag";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";

function AnimalCard(props: animalProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.dispatch((state) => {
          const topScreen = state.routes[0];
          const animalScreen = { name: "Animal", params: props };
          const routes = [topScreen, animalScreen];
          return CommonActions.reset({
            ...state,
            index: routes.length - 1,
            routes,
          });
        });
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: `./assets/thumbnails/${props.species_id}.jpg` }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={textStyles.basicBold} numberOfLines={1}>
          {props.common_name || props.genus + " " + props.species}
        </Text>
        <Text style={textStyles.basicItalic} numberOfLines={1}>
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
              <View key={item}>
                <Tag tagName={item} onlyIcon={true}></Tag>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function AnimalCardSkeleton() {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Skeleton />
        </View>
      </View>
      <View style={styles.textContainer}>
        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
            width: "75%",
            height: textStyles.basicBold.lineHeight,
          }}
        >
          <Skeleton />
        </View>
        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
            width: "50%",
            height: textStyles.basicItalic.lineHeight,
          }}
        >
          <Skeleton />
        </View>
        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
            width: "50%",
            height: textStyles.basic.lineHeight,
          }}
        >
          <Skeleton />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  image: {
    resizeMode: "cover",
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: "hidden",
    backgroundColor: Colors.Tertiary,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: Offsets.BorderRadius,
    padding: Offsets.DefaultMargin,
    height: 100,
    marginTop: Offsets.DefaultMargin,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginLeft: 20,
    marginRight: 5,
    height: 80,
    flex: 3,
  },
});

export { AnimalCard, AnimalCardSkeleton };
