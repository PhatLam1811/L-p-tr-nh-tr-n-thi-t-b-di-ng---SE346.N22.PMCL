/* eslint-disable*/
import React, { useState, useEffect } from "react";

import OctIcon from "react-native-vector-icons/Octicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import EntIcon from "react-native-vector-icons/Entypo";
import AppColors from "../utils/AppColors";
import NoteDetails from "../components/notes/NoteDetails";

import { View, Text, StyleSheet, Button } from "react-native";
import { GetNoteAction } from "./../actions/GetNote";
import { DeleteNoteAction } from "./../actions/DeleteNote";

const NewTaskScreen = (props) => {
  const [task, setTask] = useState({});
  // console.log(props.route.params)

  const _retrieve = async () => {
    const taskResponse = await GetNoteAction(props.route.params.ID);
    console.log(taskResponse);
    if (taskResponse.result === 'success') {
      setTask(taskResponse.data);
    }
  }
  const _delete = async () => {
    const taskResponse = await DeleteNoteAction(props.route.params.ID);
    console.log(taskResponse);
    if (taskResponse.message === 'success delete!') {
      console.log('success delete');
      //console.log(props.route.params.onGoBack)
      props.route.params.onGoBack();
      props.navigation.goBack();
    }
  }
  useEffect(() => {
    // console.log("taskItems after settaskItems but in useEffect hook");
    // _retrieve();
  }, []);

  return (
    <View style={styles.noteScreen}>
      <View style={styles.noteScreen_header}>
        <MatIcon name="arrow-back-ios" {...styles.noteScreen_icon} {...styles.noteScreen_backIcon} />
        <EntIcon name="share" {...styles.noteScreen_icon} {...styles.noteScreen_shareIcon} />
        <OctIcon name="check-circle" {...styles.noteScreen_icon} {...styles.noteScreen_saveIcon} />
      </View>
      <NoteDetails />
      <View style={styles.noteScreen_mischellaneous}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteScreen: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: AppColors.secondaryDark,
  },

  noteScreen_header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: AppColors.secondaryDark,
    alignItems: "center",
  },

  noteScreen_mischellaneous: {
    flex: 0.7,
    backgroundColor: AppColors.primaryDark,
  },

  noteScreen_icon: {
    backgroundColor: "transparent",
    color: AppColors.iconDark,
    size: 30,
  },

  noteScreen_backIcon: {
    size: 40,
    marginLeft: "3%",
  },

  noteScreen_shareIcon: {
    marginLeft: "auto",
    marginRight: 20,
  },

  noteScreen_saveIcon: {
    marginLeft: 0,
    marginRight: "3%",
  },

});

export default NewTaskScreen;
