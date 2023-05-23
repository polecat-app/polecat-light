import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimalScreen from "./AnimalScreen";
import ListScreen from "./saved/ListScreen";

const Stack = createNativeStackNavigator();

function SavedScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        // @ts-ignore
        component={ListScreen}
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

export default SavedScreen;
