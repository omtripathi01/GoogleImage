import React from "react";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
//screens
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import Camera from "../screens/Camera";

//navigators
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{
        headerShown: false,
        // ...TransitionPresets.ModalSlideFromBottomIOS,
      }} />
      <Stack.Screen name="Camera" component={Camera} options={{
        headerShown: false,
        // ...TransitionPresets.ModalSlideFromBottomIOS,
      }} />
    </Stack.Navigator>
  )
}

export default RootNavigator;