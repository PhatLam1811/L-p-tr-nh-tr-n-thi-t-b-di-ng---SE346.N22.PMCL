/* eslint-disable*/

import React, {Component, useState, useCallback, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

import {SaveNoteAction} from '../actions/SaveNote.js';

import moment from 'moment';
import NavigationBar from '../components/NavigationBar';
import {DeleteAllNoteAction, DeleteNoteAction} from '../actions/DeleteNote.js';
import {GetAllNoteAction, GetNoteAction} from '../actions/GetNote.js';
import {UpdateNoteAction} from '../actions/UpdateNote.js';
import GenerateRandom from '../utils/GenerateRandom.js';
import Note, { create } from '../classes/Note.js';

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
  const saveBtnPress = async () => {
    const ID = GenerateRandom(7);
    console.log(ID);
    const note = new Note(
      ID,
      inputTitle,
      inputSubTitle,
      inputNote,
      new Date(),
      'normal-note',
    );

    if (note === null) {
      console.log('misssing info');
      return;
    }
    console.log('here is note');
    console.log(note);
    const saveActionResponse = await SaveNoteAction(note);

    console.log(saveActionResponse);
  };

  const inputTitleChange = title => {
    setInputTitle(title);
  };
  const inputSubTitleChange = subTitle => {
    setInputSubTitle(subTitle);
  };
  const inputNoteChange = note => {
    setInputNote(note);
  };

  const updateNote = async () => {
    const ID = '';
    const note=Note.create(ID,title,subTitle,content,new Date(),'normal-text');
    const noteRes = await UpdateNoteAction(ID, note);
    console.log(noteRes);
    const check = await GetAllNoteAction();
    console.log(check);
  };

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
      <NavigationBar onPress={saveBtnPress} />
      <TextInput
        placeholder="Note title"
        placeholderTextColor="#1f1c1cf8"
        onChangeText={inputTitleChange}
      />
      <Text style={styles.timestamp}>
        {moment().utcOffset('+07:00').format('LLLL')}
      </Text>
      <TextInput
        placeholder="Note subtitle"
        placeholderTextColor="#383a3bc0"
        onChangeText={inputSubTitleChange}
      />
      <TextInput
        placeholder="Type your note here"
        placeholderTextColor="#383a3bc0"
        onChangeText={inputNoteChange}
      />
    </View>
  );
};
export default NewNoteScreen;
