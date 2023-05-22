/* eslint-disable*/

import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from "./src/screen/MainScreen";
import NewNoteScreen from "./src/screen/NewNoteScreen";
import DetailNoteScreen from "./src/screen/DetailNoteScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
//    <MainScreen />
//<DetailNoteScreen NoteID="UEh_5_X"/>
<NewNoteScreen/>
  );
}

export default App;
