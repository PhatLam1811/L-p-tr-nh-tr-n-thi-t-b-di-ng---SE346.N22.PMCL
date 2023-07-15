/* eslint-disable*/
import React, { useState, useEffect } from "react";

import OctIcon from "react-native-vector-icons/Octicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import EntIcon from "react-native-vector-icons/Entypo";
import AppColors from "../utils/AppColors";
import NoteDetails from "../components/notes/NoteDetails";
import TaskModel from "../classes/Task";
import moment from 'moment';

import { View, StyleSheet, ScrollView } from "react-native";
import { GetNoteAction } from "../actions/GetNote";
import { DeleteNoteAction } from "../actions/DeleteNote";
import { SaveNoteAction } from "../actions/SaveNote";
import Note from "../classes/Note";

const noteColorTags = [
  AppColors.iconDark,
  "#fcba03",
  "red",
  "purple",
  "black",
];

// const sampleImage = "https://nationaltoday.com/wp-content/uploads/2021/12/Anime-Day-1200x834.jpg";
const sampleImage = "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-anime-toc-xanh.jpg";

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
  const [note, setNote] = useState(defaultState);

  console.log(props.route.params);

  const _retrieve = async () => {
    try {
      const response = await GetNoteAction(props.route.params.ID);

      if (response.result === 'success') {
        setNote(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
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

  const SaveNoteHandler = async () => {
    try {
      const model = Note.create({ ...note, lastUpdated: new Date() });

      if (model == null) {
        console.log("Invalid note model!");
        return;
      }

      const response = await SaveNoteAction(model);

      if (response != null) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const NoteTitleChangeHandler = (value) => setNote(prev => { return { ...prev, title: value } });
  const NoteSubTitleChangeHandler = (value) => setNote(prev => { return { ...prev, subTitle: value } });
  const NoteContentChangeHandler = (value) => setNote(prev => { return { ...prev, content: value } });
  const NoteImageDeleteHandler = () => setNote(prev => { return { ...prev, image: null } });

  useEffect(() => {
    if (props.route.params.isCreateNote == null ||
      props.route.params.isCreateNote == false) {
      _retrieve();
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
