/* eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import AppContext, { AppContextProvider } from "./src/utils/AppContext";

import MainScreen from "./src/screen/MainScreen";
import NewTaskScreen from "./src/screen/NewTaskScreen";
import NoteScreen from "./src/screen/NoteScreen";
import CustomSnackBar from "./src/components/tools/CustomSnackBar";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from "react-native-popup-menu";
import { Snackbar } from "@react-native-material/core";

const Stack = createNativeStackNavigator();

const AppChild = () => {
  const appContext = useContext(AppContext);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const OnHideSnackBar = () => appContext.callSnackBar({ type: null, message: null });

  useEffect(() => {
    setIsSnackbarVisible(appContext.snackBarMessage.message != null);
  }, [appContext.snackBarMessage]);

  useEffect(() => {
    appContext.callSnackBar({ type: "welcome", message: "Have a nice day!" });
  }, []);

  return (
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
        {isSnackbarVisible === true && <Snackbar
          action={<CustomSnackBar
            info={appContext.snackBarMessage}
            onHideSnackBar={OnHideSnackBar}
          />}
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 120,
            alignSelf: "center",
            paddingEnd: 25,
            width: 0,
            height: 0,
          }}>
        </Snackbar>}
      </NavigationContainer>
    </MenuProvider >
  )
}

const App = () => {
  return (
    <AppContextProvider>
      <AppChild />
    </AppContextProvider>)
};

export default App;
