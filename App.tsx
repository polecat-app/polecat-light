import React from "react";
import "react-native-url-polyfill/auto";
import { LocationProvider } from "./src/provider/LocationProvider";
import MainTabs from "./src/navigation/MainTabs";
import { NavigationContainer } from "@react-navigation/native";
import "./i18n.config";

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </LocationProvider>
  );
}
