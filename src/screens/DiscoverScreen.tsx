import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimalScreen from "./AnimalScreen";
import ListScreen from "./discover/ListScreen";
import MapScreen from "./discover/MapScreen";

const Stack = createNativeStackNavigator();

function DiscoverScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        // @ts-ignore
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        // @ts-ignore
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Animal"
        // @ts-ignore
        component={AnimalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default DiscoverScreen;
