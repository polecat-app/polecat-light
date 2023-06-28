import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import textStyles from "../styles/TextStyles";
import { Tags } from "../util/Constants";
import { useTranslation } from "react-i18next";

interface TagProps {
  tagName: StaticTags | null;
  onlyIcon?: boolean;
}

function Tag({ tagName, onlyIcon = false }: TagProps) {
  if (tagName === null) {
    return null;
  }
  const tag = Tags[tagName];
  if (tag === null) {
    return null;
  }
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: tag.color }]}>
      {!onlyIcon && (
        <Text
          style={[
            textStyles.basicAccentBold,
            { marginHorizontal: 7, marginVertical: 2 },
          ]}
        >
          {t(tagName)}
        </Text>
      )}
      <MaterialCommunityIcons
        // @ts-ignore
        name={tag.icon}
        size={12}
        color={Colors.AccentIcon}
        style={{ margin: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginRight: 7,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Tag;
