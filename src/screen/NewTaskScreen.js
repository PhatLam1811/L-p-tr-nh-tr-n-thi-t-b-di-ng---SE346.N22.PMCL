/* eslint-disable*/

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Task from "./../components/tasks/Task"
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Button, Keyboard } from 'react-native'
import { TextInput } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SaveNoteAction } from './../actions/SaveNote'
import { GetAllNoteAction, GetNoteAction } from './../actions/GetNote'
import { DeleteAllNoteAction, DeleteNoteAction } from './../actions/DeleteNote'
import Note from '../classes/Note';
import GenerateRandom from '../utils/Utils';
=======
import React, {useState, useEffect} from 'react';
import Task from './../components/tasks/Task';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
>>>>>>> origin/quy-branch

import {Button, TextInput,IconButton, Stack} from '@react-native-material/core';
import Icon from "react-native-vector-icons/Octicons";


const NewTaskScreen = props => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);



<<<<<<< HEAD
      const ID = GenerateRandom(7);
      const note = Note.create(ID, 'title', 'subtitle', itemsCopy, new Date(), 'normal-note')
      console.log('note is:')
      console.log(note)
      if (note === null) {
        console.log('note is null');
        return;
      }


      const saveData = await SaveNoteAction(note);
      console.log(saveData);
      return saveData.data;
    }
    catch (error) {
      // Error saving data
      setRetrieveData('error input:' + error.message);
      return null;
    }
  };
=======
  const ChangeNotesLayoutHandler = () => {
      console.log("change notes layout (column to grids & vice versa)")
      // change notes display style 
  }

  const CreateChecklistNoteHandler = () => {
      console.log("checklist pressed!")
      // display create checklist note screen
  }

  const CreateImageNoteHandler = () => {
      console.log("image note pressed!")
      // display create image note screen
  }

  const CreateURLNoteHandler = () => {
      console.log("URL note pressed!")
  }

>>>>>>> origin/quy-branch

  const _retrieveData = async () => {
    console.log("im retrieving...");
  
    //const names = await GetAllNoteAction();
    // if (names.result === 'success') {
    //     console.log(names.data);
    //     setTaskItems(names.data);
    // }
    
  }

  const completeTask = async(index)  =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1); 
    setTaskItems([...itemsCopy]);
   
  }

  const HandleAddTask = async () => {
    //let itemsCopy = [...taskItems, task];
    console.log("adding" + task);

    console.log('taskItems before change:' + JSON.stringify(taskItems));
    //const saveData = await SaveNoteAction(itemsCopy);

    //Keyboard.dismiss();
    setTaskItems([...taskItems,task]);
    setTask(null);

  };

  useEffect(() => {
    console.log('taskItems after change:' + JSON.stringify(taskItems));
  }, [taskItems] );

  const screenNavigation = (ID) => {
      props.navigation.navigate('Detail', {
          ID: ID,
          onGoBack: () => _retrieveData(),
      });
  }



  return (
    <View >
       
       <Stack spacing={2} style={{ margin: 16 }}>
          <TextInput
            label='Add task'
            placeholder={'Write a task'}
            value={task}
            onChangeText={ text => {
              setTask(text);
            }
            }
            variant="outlined"
            trailing={
              props => (
              <IconButton 
                onPress={HandleAddTask}
                icon={props => <Icon name="plus" {...props} />} {...props} 

              />
            )}
          />
      </Stack>
    
      <View style={styles.items}>
        {
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item}/>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View >
  );
};


const styles = StyleSheet.create({
  items:{
    //marginTop: 30
  },
 

  taskContent: {
      height:"100%",
      flex: 1,
      backgroundColor: "transparent",
      marginHorizontal: "3%",
  },
  
 
});

export default NewTaskScreen;
