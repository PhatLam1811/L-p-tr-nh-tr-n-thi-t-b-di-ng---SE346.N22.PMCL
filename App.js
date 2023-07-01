/* eslint-disable*/

import React, { useState, useEffect } from "react";
import Task from "./src/components/tasks/Task"
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Button, Keyboard } from 'react-native'
import { TextInput } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SaveNoteAction } from './src/actions/SaveNote'
import { GetAllNoteAction, GetNoteAction } from './src/actions/GetNote'
import { DeleteAllNoteAction, DeleteNoteAction } from './src/actions/DeleteNote'
import NewTaskScreen from "./src/screen/NewTaskScreen";
import MainScreen from "./src/screen/MainScreen";
import DetailScreen from "./src/screen/DetailScreen";
import { ScreenType } from "./src/constants/Constants"

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
