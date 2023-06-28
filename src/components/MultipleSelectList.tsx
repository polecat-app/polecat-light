import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Tag from "./Tag";
import textStyles from "../styles/TextStyles";
import { Colors } from "../styles/Colors";
import { Offsets } from "../styles/Offsets";
import { useTranslation } from "react-i18next";

interface dataTag {
  key: StaticTags;
  value: StaticTags;
  disabled?: boolean;
}

interface MultipleSelectListProps {
  setSelected: Function;
  placeholder?: string;
  maxHeight?: number;
  data: dataTag[];
  onSelect?: () => void;
  label?: string;
  notFoundText?: string;
  save?: "key" | "value";
  dropdownShown?: boolean;
  selected: StaticTags[];
}

function MultipleSelectList({
  setSelected,
  placeholder,
  maxHeight,
  data,
  onSelect = () => {},
  label,
  notFoundText = "",
  save = "key",
  dropdownShown = false,
  selected,
}: MultipleSelectListProps) {
  const [_firstRender, _setFirstRender] = useState<boolean>(true);
  const [dropdown, setDropdown] = useState<boolean>(dropdownShown);
  const [selectedval, setSelectedVal] = useState<StaticTags[]>(selected);
  const [height, setHeight] = useState<number>(350);
  const animatedvalue = React.useRef(new Animated.Value(0)).current;
  const [filtereddata, setFilteredData] = useState(data);
  const { t } = useTranslation();

  const slidedown = () => {
    setDropdown(true);

    Animated.timing(animatedvalue, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const slideup = () => {
    Animated.timing(animatedvalue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setDropdown(false));
  };

  React.useEffect(() => {
    if (maxHeight) setHeight(maxHeight);
  }, [maxHeight]);

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  React.useEffect(() => {
    if (_firstRender) {
      _setFirstRender(false);
      return;
    }
    onSelect();
  }, [selectedval]);

  React.useEffect(() => {
    if (!_firstRender) {
      if (dropdownShown) slidedown();
      else slideup();
    }
  }, [dropdownShown]);

  return (
    <View style={{ flex: 1 }}>
      {selectedval?.length > 0 ? (
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <View>
            <Text style={textStyles.basicAccentBold}>{label}</Text>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 8,
                flexWrap: "wrap",
              }}
            >
              {selectedval?.map((item) => {
                return (
                  <View
                    style={{
                      marginTop: 10,
                    }}
                    key={item}
                  >
                    <Tag tagName={item}></Tag>
                  </View>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            if (!dropdown) {
              slidedown();
            } else {
              slideup();
            }
          }}
        >
          <Text style={textStyles.basicAccentBold}>
            {selectedval?.length == 0
              ? placeholder
                ? placeholder
                : t('select option')
              : selectedval}
          </Text>
          <Ionicons
            name={dropdown ? "chevron-up-outline" : "chevron-down-outline"}
            style={{ alignSelf: "center" }}
            size={15}
            color={Colors.AccentIcon}
          ></Ionicons>
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View style={[{ maxHeight: animatedvalue }, styles.dropdown]}>
          <View style={[{ maxHeight: height }]}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 10 }}
              nestedScrollEnabled={true}
            >
              {filtereddata.length >= 1 ? (
                filtereddata.map((item, index) => {
                  let key = item.key ?? item.value ?? item;
                  let value = item.value ?? item;
                  let disabled = item.disabled ?? false;
                  if (disabled) {
                    return (
                      <TouchableOpacity
                        style={styles.disabledoption}
                        key={index}
                      >
                        <View
                          style={{
                            width: 15,
                            height: 15,
                            marginRight: 10,
                            borderRadius: 3,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#c4c5c6",
                          }}
                        >
                          {selectedval?.includes(value) ? (
                            <Ionicons
                              name="checkmark-outline"
                              color={Colors.AccentIcon}
                            ></Ionicons>
                          ) : null}
                        </View>
                        <Text style={{ color: "#c4c5c6" }}>{value}</Text>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={styles.option}
                        key={index}
                        onPress={() => {
                          let existing = selectedval?.indexOf(value);
                          if (existing != -1 && existing != undefined) {
                            let sv = [...selectedval];
                            sv.splice(existing, 1);
                            setSelectedVal(sv);

                            setSelected((val: any) => {
                              let temp = [...val];
                              temp.splice(existing, 1);
                              return temp;
                            });

                            // onSelect()
                          } else {
                            if (save === "value") {
                              setSelected((val: any) => {
                                if (val.includes(value)) {
                                  return val;
                                } else {
                                  return [...val, value];
                                }
                              });
                            } else {
                              setSelected((val: any) => {
                                if (val.includes(key)) {
                                  return val;
                                } else {
                                  return [...val, key];
                                }
                              });
                            }

                            setSelectedVal((val: any) => {
                              if (val.includes(value)) {
                                return val;
                              } else {
                                return [...val, value];
                              }
                            });

                            // onSelect()
                          }
                        }}
                      >
                        <View style={styles.checkmark}>
                          {selectedval?.includes(value) ? (
                            <Ionicons
                              name="checkmark-outline"
                              color={Colors.AccentIcon}
                            ></Ionicons>
                          ) : null}
                        </View>
                        <Text style={textStyles.basicAccent}>{value}</Text>
                      </TouchableOpacity>
                    );
                  }
                })
              ) : (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelected(undefined);
                    setSelectedVal([]);
                    slideup();
                    setTimeout(() => setFilteredData(data), 800);
                  }}
                >
                  <Text style={textStyles.basicAccent}>{notFoundText}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            {selectedval?.length > 0 ? (
              <Pressable>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: 20,
                  }}
                ></View>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
}

export default MultipleSelectList;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: Offsets.DefaultMargin,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: Colors.AccentSecondary,
    borderWidth: 0,
    color: Colors.AccentText,
  },
  dropdown: {
    borderWidth: 0,
    borderRadius: 10,
    overflow: "hidden",
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  disabledoption: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  checkmark: {
    width: 15,
    height: 15,
    borderWidth: 1,
    marginRight: Offsets.DefaultMargin,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.AccentIcon,
  },
});
