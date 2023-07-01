import React, {useState, useEffect} from 'react';

import { Text, TouchableOpacity,View,FlatList } from "react-native";
import {DeleteAllNoteAction, DeleteNoteAction}from'./../../actions/DeleteNote'

import Task from './../tasks/Task';

const NoteList = (props) => {

  const openTask = async index => {
    // console.log("index is being deleted:" + index);
    // let itemsCopy = [...notes];
    // itemsCopy.splice(index,1);
    // setNotes([...itemsCopy]);
    // await DeleteNoteAction(notes[index].ID);

    props.screenNavigation(props.list[index].ID);
  };

  // useEffect(() => {
  //     console.log('porops list is: ');
  //     setNotes(props.list);
  // }, [props]);

    return (
        <View style={props.style}>
            <View>
{/* {            notes.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => openTask(index)}>
                  <Task text={item.noteData}/>
                </TouchableOpacity>
              )
            })} */}

<FlatList style={{margin:5}}
  data={notes}
  numColumns={2}
  keyExtractor={(item, index) => item.id }
  renderItem={(item) => <Task text={item.noteData}/> }
/>
            </View>
        </View >
    );
}

export default NoteList;
