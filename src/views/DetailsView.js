/* eslint-disable*/

import React, {Component, useState, useCallback, useEffect} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native';

import { GetNoteAction } from '../actions/GetNote.js';
import { SaveNoteAction } from '../actions/SaveNote.js';

import moment from 'moment';
import NavigationBar from '../components/NavigationBar';

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
  // const saveTitle = await AsyncStorage.getItem('noteTitle');
  // const saveSubTitle = await AsyncStorage.getItem('noteSubTitle');
  // const saveContent = await AsyncStorage.getItem('noteContent');
const DetailsView =(navigation) => {
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
    const logdger=async()=>{
      const GetNoteResponse=await GetNoteAction('lveGGoz');

      console.log(GetNoteResponse)
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
      <Button title='logger' onPress={logdger}/>

    </View>
  );
};
export default DetailsView;
