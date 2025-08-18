import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Home from "../screens/public/Home";

export type RootStackParamList = {
  Home: {home: string}; 

};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Cardápio Digital" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;