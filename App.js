/* eslint-disable*/

import React from "react";

import MainScreen from "./src/screen/MainScreen";
import NewTaskScreen from "./src/screen/NewTaskScreen";
import DetailScreen from "./src/screen/DetailScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  const onSave = () => {
    console.log('save on App.js')
  }
  return (
    //    <MainScreen />
    //<DetailNoteScreen NoteID="UEh_5_X"/>

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="NewTask" component={NewTaskScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>)
};

export default App;
