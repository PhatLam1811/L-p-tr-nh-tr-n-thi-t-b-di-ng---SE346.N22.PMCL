/* eslint-disable*/
import React, { useState, useEffect } from "react";

import OctIcon from "react-native-vector-icons/Octicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import EntIcon from "react-native-vector-icons/Entypo";
import AppColors from "../utils/AppColors";
import NoteDetails from "../components/notes/NoteDetails";
import moment from 'moment';

import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { GetNoteAction } from "../actions/GetNote";
import { DeleteNoteAction } from "../actions/DeleteNote";

const initLastUpdated = moment(new Date()).format("dddd, Do MMM YYYY h:mm a");
const noteColorTags = [
  AppColors.iconDark,
  "#fcba03",
  "red",
  "purple",
  "black",
];

// const sampleImage = "https://nationaltoday.com/wp-content/uploads/2021/12/Anime-Day-1200x834.jpg";
const sampleImage = "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/hinh-anh-anime-toc-xanh.jpg";

const NoteScreen = (props) => {
  const defaultState = {
    title: null,
    lastUpdated: initLastUpdated,
    subTitle: null,
    colorTag: noteColorTags[0],
    image: sampleImage,
    content: null,
    tasks: [],
  }
  const [note, setNote] = useState(defaultState);

  // console.log(props.route.params)

  // const _retrieve = async () => {
  //   if ()
  //   const taskResponse = await GetNoteAction(props.route.params.ID);
  //   console.log(taskResponse);
  //   if (taskResponse.result === 'success') {
  //     setTask(taskResponse.data);
  //   }
  // }

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

  const NoteTitleChangeHandler = (value) => setNote(prev => { return { ...prev, title: value } });
  const NoteSubTitleChangeHandler = (value) => setNote(prev => { return { ...prev, subTitle: value } });
  const NoteContentChangeHandler = (value) => setNote(prev => { return { ...prev, content: value } });
  const NoteImageDeleteHandler = () => setNote(prev => { return { ...prev, image: null } });

  return (
    <View style={styles.noteScreen}>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.noteScreen_header}>
          <MatIcon name="arrow-back-ios"
            {...styles.noteScreen_icon}
            {...styles.noteScreen_backIcon}
            onPress={() => props.navigation.goBack()} />
          <EntIcon name="share" {...styles.noteScreen_icon} {...styles.noteScreen_shareIcon} />
          <OctIcon name="check-circle" {...styles.noteScreen_icon} {...styles.noteScreen_saveIcon} />
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
