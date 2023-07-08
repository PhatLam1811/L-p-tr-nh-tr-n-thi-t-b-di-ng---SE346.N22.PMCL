/* eslint-disable*/

import React from "react";

import MainScreen from "./src/screen/MainScreen";
import NewTaskScreen from "./src/screen/NewTaskScreen";
import NoteScreen from "./src/screen/NoteScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from "react-native-popup-menu";

const Stack = createNativeStackNavigator();

const App = () => {
  const onSave = () => {
    console.log('save on App.js')
  }
  return (
    //    <MainScreen />
    //<DetailNoteScreen NoteID="UEh_5_X"/>
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="NewTask" component={NewTaskScreen} />
          <Stack.Screen name="Detail"
            component={NoteScreen}
            options={{
              animationTypeForReplace: "push",
              animation: "slide_from_right"
            }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider >)
};

export default App;
