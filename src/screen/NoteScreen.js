/* eslint-disable*/
import React, { useState, useEffect, useContext } from "react";

import OctIcon from "react-native-vector-icons/Octicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import EntIcon from "react-native-vector-icons/Entypo";
import AppContext from "../utils/AppContext";
import AppColors from "../utils/AppColors";
import AppController from "../controllers/AppController";
import NoteDetails from "../components/notes/NoteDetails";
import TaskModel from "../classes/Task";
import moment from 'moment';

import { View, StyleSheet, ScrollView } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';

const noteColorTags = [
  AppColors.iconDark,
  "#fcba03",
  "red",
  "purple",
  "black",
];

const sampleTasks = [
  new TaskModel("watch walking dead ep6", false),
  new TaskModel("finished todo app", true),
  new TaskModel("report today tasks to PL", false),
  new TaskModel("jogging", false),
  new TaskModel("sleep at 10", false),
];

const defaultState = {
  ID: null,
  title: null,
  lastUpdated: moment(new Date()).format("dddd, Do MMM YYYY h:mm a"),
  subTitle: null,
  colorTag: noteColorTags[0],
  image: null,
  content: null,
  url: null,
  tasks: null,
}

const NoteScreen = (props) => {
  const appContext = useContext(AppContext);

  const [note, setNote] = useState(defaultState);

  const SaveNoteHandler = async () => {
    await AppController.SaveNote({
      note: note,
      onSuccess: () => {
        appContext.callSnackBar({
          type: "congrats",
          message: "Save note successfully!"
        });
        props.navigation.goBack();
      },
      onFailed: (response) => console.log(response),
    })
  }

  const ImagePicker = async () => {
    try {
      launchImageLibrary({ storagOptions: { path: 'image' } },
        (response) => {
          if (response.assets != null) {
            NoteImageChangeHandler(response.assets[0]);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  const NoteTitleChangeHandler = (value) => setNote(prev => { return { ...prev, title: value } });
  const NoteSubTitleChangeHandler = (value) => setNote(prev => { return { ...prev, subTitle: value } });
  const NoteContentChangeHandler = (value) => setNote(prev => { return { ...prev, content: value } });
  const NoteImageChangeHandler = (image) => setNote(prev => { return { ...prev, image: image } })
  const NoteImageDeleteHandler = () => setNote(prev => { return { ...prev, image: null } });

  useEffect(() => {
    if (props.route.params.isCreateNote == false) {
      AppController.GetNote({
        ID: props.route.params.ID,
        onSuccess: (data) => setNote(data),
        onFailed: (response) => console.log(response)
      })
    }
    else {
      switch (props.route.params.type) {
        case "task":
          setNote(prev => { return { ...prev, tasks: [] } }); break;
        case "image":
          ImagePicker();
          console.log("image type"); break;
      }
    }
  }, []);

  return (
    <View style={styles.noteScreen}>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.noteScreen_header}>
          <MatIcon name="arrow-back-ios"
            {...styles.noteScreen_icon}
            {...styles.noteScreen_backIcon}
            onPress={() => props.navigation.goBack()} />
          <EntIcon name="share"
            {...styles.noteScreen_icon}
            {...styles.noteScreen_shareIcon} />
          <OctIcon name="check-circle"
            {...styles.noteScreen_icon}
            {...styles.noteScreen_saveIcon}
            onPress={SaveNoteHandler} />
        </View>
        <NoteDetails note={note}
          onTitleChange={NoteTitleChangeHandler}
          onSubTitleChange={NoteSubTitleChangeHandler}
          onContentChange={NoteContentChangeHandler}
          onImageDelete={NoteImageDeleteHandler} />
      </ScrollView>
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
    height: 60,
    alignItems: "center",
  },

  noteScreen_mischellaneous: {
    backgroundColor: AppColors.primaryDark,
    height: 50,
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

export default NoteScreen;
