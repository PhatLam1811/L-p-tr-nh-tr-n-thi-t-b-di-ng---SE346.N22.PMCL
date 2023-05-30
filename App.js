/* eslint-disable*/

import React,{useState,useEffect}  from "react";
import Task from "./src/components/tasks/Task"
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Button, Keyboard} from 'react-native'
import { TextInput } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';

function makeid(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZa_xXx_I_Put_A_Little_Secret_Here_xXx_bcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const App = () => {
  const [task,setTask] = useState();
  const [taskItems,setTaskItems] = useState([]);
  const [retrieveData, setRetrieveData] = useState('');


  const save = async () => {
    try {
      console.log(JSON.stringify(taskItems));
      await AsyncStorage.setItem('taskItems', JSON.stringify(taskItems));
    } 
    catch (error) {
      // Error saving data
      setRetrieveData('error input:' + error.message);
    }
  };

  const _retrieveData = async () => {
    try {
      const names = await AsyncStorage.getItem('taskItems');

      if (names !== null) {

        const list_name = await JSON.parse(names);
      

        setTaskItems(list_name);
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

  const completeTask = async(index)  =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1); 
    setTaskItems([...itemsCopy]);
    await _storeData();
  }
  const handleAddTask = async () =>{

    setTaskItems([...taskItems, task]);

    setTask(null);
    Keyboard.dismiss();1
    
  }
  const clearScreen = () => {
    setListName(prevList => []);
  };
  const reloadList = async () => {
    await _retrieveData();
  };

  useEffect(() => {
    
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
                <TouchableOpacity key={index} onPress={() => completeTask()}>
                  <Task  text={item}/>
                </TouchableOpacity>
              )
            })
          }

        </View>
      <Button title="Reload" onPress={reloadList} />

      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}      >
        <TextInput 
          style={styles.input} 
          placeholder={'Write a task'} 
          value={task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={async () =>{
          handleAddTask();
          } } >
          <View style={styles.addWrapper}          >
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View> 

    // write a task

    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#E8EAED'
  },
  taskswrapper:{
    paddingTop:80,
    paddingHorizontal:20,

  },
  items:{
    marginTop: 30
  },
  sectionTitle:{
    fontSize:24,
    fontWeight:'bold'
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'

  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor:'#FFF',
    borderRadius: 50,
    borderColor:'#C0C0C0',
    borderWidth:1,
    width: 250,
    
   
  },
  addText:{

  },
  addWrapper:{ 
    width:60,
    height:60,
    backgroundColor:"#FFF",
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#C0C0C0',
    borderWidth:1

  }
});

export default App;
 