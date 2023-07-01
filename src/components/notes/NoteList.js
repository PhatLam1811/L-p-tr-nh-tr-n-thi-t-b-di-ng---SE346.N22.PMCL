import React, { useState, useEffect } from "react";

import { Text, TouchableOpacity, View } from "react-native";
import { DeleteAllNoteAction, DeleteNoteAction } from './../../actions/DeleteNote'

import Task from "./../tasks/Task"

const NoteList = (props) => {
  const [notes, setNotes] = useState([]);

  const openTask = async (index) => {
    // console.log("index is being deleted:" + index);
    // let itemsCopy = [...notes];
    // itemsCopy.splice(index,1); 
    // setNotes([...itemsCopy]);
    // await DeleteNoteAction(notes[index].ID);

    props.screenNavigation(notes[index].ID);
  }

  useEffect(() => {
    console.log('porops list is: ');
    console.log(props.list)
    setNotes(props.list);
  }, [props]);

  return (
    <View style={props.style}>
      <Text style={{ color: "black" }}> This is a note list</Text>
      <View>
        {notes.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => openTask(index)}>
              <Task text={item.noteData} />
            </TouchableOpacity>
          )
        })}
      </View>
    </View >
  );
}

export default NoteList;