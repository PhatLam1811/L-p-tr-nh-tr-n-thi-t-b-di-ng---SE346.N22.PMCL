import React, { useState, useEffect } from 'react';

import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import {
  DeleteAllNoteAction,
  DeleteNoteAction,
} from './../../actions/DeleteNote';

import Note from "../../classes/Note.js"
import NoteCard from "./NoteCard";

const NoteList = props => {
  const [notes, setNotes] = useState([]);

  const openTask = (index) => {
    // console.log("index is being deleted:" + index);
    // let itemsCopy = [...notes];
    // itemsCopy.splice(index,1);
    // setNotes([...itemsCopy]);
    // await DeleteNoteAction(notes[index].ID);
    props.screenNavigation(notes[index].ID);
  };

  const RenderNoteComponentsHandler = (list) => {
    console.log(list);
    return list.map((item) => {
      const index = notes.findIndex(noteItem => noteItem.ID === item.ID);
      return <NoteCard key={index} index={index} id={item.ID} onSelect={openTask} />
    });
  }

  const RenderColumnLayoutHandler = () => {
    return (
      <View style={styles.noteList__container}>
        <View style={styles.noteList__column}>
          {RenderNoteComponentsHandler(notes)}
        </View>
      </View>);
  };

  const RenderGridLayoutHandler = () => {
    let column_1_Notes = [];
    let column_2_Notes = [];

    notes.map((item, index) => {
      if (index % 2 === 0)
        column_1_Notes.push(item);
      else
        column_2_Notes.push(item);
    })

    return (
      <View style={styles.noteList__container}>
        <View style={styles.noteList__column}>
          {RenderNoteComponentsHandler(column_1_Notes)}
        </View>
        <View style={styles.noteList__column}>
          {RenderNoteComponentsHandler(column_2_Notes)}
        </View>
      </View>);
  }

  const RenderLayoutHandler = () => {
    if (props.layout !== "grid")
      return RenderColumnLayoutHandler();
    else {
      return RenderGridLayoutHandler();
    }
  };

  useEffect(() => setNotes(props.list), [props]);

  return (
    <View style={styles.noteList}>
      <ScrollView>
        {RenderLayoutHandler()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  noteList: {
    backgroundColor: "inherit",
    height: "85%",
  },

  noteList__container: {
    flexDirection: "row",
    padding: "1%",
  },

  noteList__column: {
    flex: 1,
    marginHorizontal: "1%",
  },
});

export default NoteList;