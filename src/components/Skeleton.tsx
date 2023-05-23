import React, { useRef, useEffect } from "react";
import { Animated, View } from "react-native";
import { Colors } from "../styles/Colors";

const Skeleton = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animateSkeleton = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  useEffect(() => {
    animateSkeleton();
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors.Tertiary,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "absolute",
          opacity: opacity,
        }}
      />
    </View>
  );
};

export default Skeleton;
