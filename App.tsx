import React from "react";
import "react-native-url-polyfill/auto";
import { LocationProvider } from "./src/provider/LocationProvider";
import MainTabs from "./src/navigation/MainTabs";
import { NavigationContainer } from "@react-navigation/native";
import "./i18n.config";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <MainTabs />
        </SafeAreaProvider>
      </NavigationContainer>
    </LocationProvider>
  );
}
