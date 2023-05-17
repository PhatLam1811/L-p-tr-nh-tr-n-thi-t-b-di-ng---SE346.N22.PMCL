/* eslint-disable*/

import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from "./src/screen/MainScreen";
import DetailsView from"./src/views/DetailsView"
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <Provider store={store}>
    //   <MainView />
    // </Provider>
    // <DetailsView />
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Main"
          component={MainScreen}
        /> */}
        <Stack.Screen name="Detail" component={DetailsView} />
      </Stack.Navigator>

  </NavigationContainer>
    // <MainScreen />
  );
}

export default App;
