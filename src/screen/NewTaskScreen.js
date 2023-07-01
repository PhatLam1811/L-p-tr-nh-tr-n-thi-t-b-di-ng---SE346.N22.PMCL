/* eslint-disable*/

import React, {useState, useEffect} from 'react';
import Task from './../components/tasks/Task';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import NoteList from "../components/notes/NoteList";

import {Button, TextInput} from '@react-native-material/core';


const NewTaskScreen = props => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);



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
    <View style={styles.mainScreen}>
       
      <View style={styles.mainScreen__header}>
          <TextInput 
            style={styles.mainScreen__taskTitle } 
            placeholder={'Write a task'}
            value={task}
            onChangeText={ text => {
                setTask(text);
              }
            }
          />
          <Button
          onPress={HandleAddTask}
          title="+"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          />
      </View>
    
      <View style={styles.items}>
        {
          taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task  text={item}/>
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
    marginTop: 30
  },
  mainScreen: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
  },

  mainScreen__header: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf:"flex-start",
      alignItems: "center",
      marginVertical: "5%",
      marginHorizontal: "3%",
  },

  mainScreen__title: {
      fontSize: 25,
      fontWeight: 700,
  },

  mainScreen__noteList: {
      flex: 12,
      backgroundColor: "transparent",
      marginBottom: "5%",
      marginHorizontal: "3%",
  },
  mainScreen__taskTitle: {
    flex: 12,
    backgroundColor: "transparent",
    marginBottom: "5%",
    marginHorizontal: "3%",
  },

  
  mainScreen__newNoteFAB: {
      color: "#fcba03",
      variant: "standard",
      size: "default",
      marginLeft: "auto",
      marginRight: "5%",
      marginTop: "-7%",
      marginBottom: "auto"
  },
  addWrapper: {
    width: 30,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addText: {

  }
});

export default NewTaskScreen;
