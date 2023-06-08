/* eslint-disable*/

import React,{useState,useEffect}  from "react";
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Button, Keyboard} from 'react-native'
import { TextInput } from "@react-native-material/core";
import {SaveNoteAction} from'./../actions/SaveNote'
import {GetAllNoteAction, GetNoteAction} from'./../actions/GetNote'
import {DeleteAllNoteAction, DeleteNoteAction}from'./../actions/DeleteNote'
import { NavigationHelpersContext } from "@react-navigation/native";

const NewTaskScreen = (props) => {
  const [task,setTask] = useState({});
  console.log(props.route.params)

  const _retrieve=async()=>{
    const taskResponse=await GetNoteAction(props.route.params.ID);
    console.log(taskResponse);
    if(taskResponse.result==='success'){
        setTask(taskResponse.data);
    }
  }
  const _delete=async()=>{
    const taskResponse=await DeleteNoteAction(props.route.params.ID);
    console.log(taskResponse);
    if(taskResponse.message==='success delete!'){
        console.log('success delete');
        //console.log(props.route.params.onGoBack)
        props.route.params.onGoBack();
        props.navigation.goBack();
    }
  }
  useEffect(() => {
    console.log("taskItems after settaskItems but in useEffect hook");
    _retrieve();
  }, []);

  return (
    <View style={styles.container}>
    <Text >{task.noteData}</Text>
    <Button title="Completed" onPress={_delete}/>
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

export default NewTaskScreen;
 