/* eslint-disable*/

import React, { useState, useEffect } from "react";
import Task from "./../components/tasks/Task"
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Button, Keyboard } from 'react-native'
import { TextInput } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SaveNoteAction } from './../actions/SaveNote'
import { GetAllNoteAction, GetNoteAction } from './../actions/GetNote'
import { DeleteAllNoteAction, DeleteNoteAction } from './../actions/DeleteNote'

const NewTaskScreen = (props) => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [retrieveData, setRetrieveData] = useState('');


  const save = async (itemsCopy) => {
    try {
      console.log("taskItems in savemethod:" + JSON.stringify(itemsCopy));
      //await SaveNoteAction(taskItems);
      // await AsyncStorage.setItem('taskItems', JSON.stringify(itemsCopy));

      const saveData = await SaveNoteAction(itemsCopy);
      console.log(saveData);
      return saveData.data;
    }
    catch (error) {
      // Error saving data
      setRetrieveData('error input:' + error.message);
      return null;
    }
  };

  const _retrieveData = async () => {

    try {
      console.log("_retriveData begins");

      // const names = await AsyncStorage.getItem('taskItems');

      const names = await GetAllNoteAction();
      //await DeleteAllNoteAction();
      console.log(names);
      // console.log("got datas" + names);
      if (names.result === 'success') {
        setTaskItems(names.data);
        setRetrieveData('taskItems get from async ' + Date.now());
      }
      else {
        setRetrieveData(
          'taskItems cant be get ' + Date.now() + ' ' + names + ' ....',
        );
      }

    } catch (error) {
      // Error retrieving data
      setRetrieveData('error retrieve:' + error.message);
    }
  };

  const completeTask = async (index) => {
    console.log("index is being deleted:" + index);
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems([...itemsCopy]);
    await DeleteNoteAction(taskItems[index].ID);
  }
  const handleAddTask = async () => {
    // let itemsCopy = [...taskItems, task];

    const saveData = await save(task);
    //await SaveNoteAction(task);
    Keyboard.dismiss();
    // setTaskItems([...taskItems,saveData]);
    // setTask(null);

    props.route.params.onGoBack();
    props.navigation.goBack();
  }
  const reloadList = async () => {
    await _retrieveData();
  };

  useEffect(() => {
    console.log("taskItems after settaskItems but in useEffect hook" + JSON.stringify(taskItems));

  }, [taskItems]);

  return (
    <View style={styles.container}>
      <Text text={retrieveData} >hello</Text>
      <View style={styles.taskswrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item.noteData} />
                </TouchableOpacity>
              )
            })
          }
        </View>
        {/* <Button title="Reload" onPress={reloadList} /> */}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task} onChangeText={text => { setTask(text) }} />
        <TouchableOpacity onPress={async () => {
          handleAddTask();
        }} >
          <View style={styles.addWrapper}          >
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  taskswrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,

  },
  items: {
    marginTop: 30
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,


  },
  addText: {

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1

  }
});

export default NewTaskScreen;
