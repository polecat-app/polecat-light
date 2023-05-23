import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DiscoverScreen from "../screens/DiscoverScreen";
import SavedScreen from "../screens/SavedScreen";
import AccountScreen from "../screens/AccountScreen";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "alert-circle";

          if (route.name === "Discover") {
            iconName = focused ? "compass" : "compass-outline";
          } else if (route.name === "Saved") {
            iconName = focused ? "ios-bookmark" : "ios-bookmark-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }
          // @ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.AccentPrimary,
        tabBarInactiveTintColor: Colors.Inactive,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarOptions: {
          showLabel: false,
        },
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
