/* eslint-disable*/

import React, {Component, useState, useCallback, useEffect} from 'react';
import {View, Text, Button, TextInput,StyleSheet} from 'react-native';

import { SaveNoteAction } from '../actions/SaveNote.js';

import moment from 'moment';
import NavigationBar from '../components/NavigationBar';
import { DeleteAllNoteAction,DeleteNoteAction } from '../actions/DeleteNote.js';
import { GetAllNoteAction ,GetNoteAction} from '../actions/GetNote.js';
import { UpdateNoteAction } from '../actions/UpdateNote.js';

const NewNoteScreen = () => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    timestamp: {
      color: '#383a3bc0',
    },
  });

  const [inputTitle, setInputTitle] = useState('');
  const [inputSubTitle, setInputSubTitle] = useState('');
  const [inputNote, setInputNote] = useState('');
  const saveBtnPress=async()=>{
          const saveActionResponse=await SaveNoteAction({title:inputTitle,subTitle:inputSubTitle,content:inputNote});

console.log(saveActionResponse);

  }

  const inputTitleChange=title=>{
setInputTitle(title)
  }
  const inputSubTitleChange=subTitle=>{
    setInputSubTitle(subTitle)
      }
      const inputNoteChange=note=>{
        setInputNote(note)
          }

        //   useEffect(()=>{
        //     async function start(){
        //     const noteRes= await UpdateNoteAction('P_aQsIK',{title:'updateddfs title',subTitle:'updated subTdasditle',content:'updated content'});
        //     console.log(noteRes);
        //     const check=await GetAllNoteAction();
        //     console.log(check);
        //     };
        //     start();
        // },[]);
  return (
    <View>
      <NavigationBar onPress={saveBtnPress}/>
      <TextInput placeholder="Note title" placeholderTextColor="#1f1c1cf8" onChangeText={inputTitleChange} />
      <Text style={styles.timestamp}>
        {moment().utcOffset('+07:00').format('LLLL')}
      </Text>
      <TextInput placeholder="Note subtitle" placeholderTextColor="#383a3bc0" onChangeText={inputSubTitleChange}/>
      <TextInput
        placeholder="Type your note here"
        placeholderTextColor="#383a3bc0"
        onChangeText={inputNoteChange}
      />
    </View>
  );
};
export default NewNoteScreen;
