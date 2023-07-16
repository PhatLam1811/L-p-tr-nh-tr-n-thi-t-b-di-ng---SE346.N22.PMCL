/* eslint-disable*/

import React, {Component, useState, useCallback, useEffect} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, Alert} from 'react-native';

import {GetNoteAction, GetAllNoteAction} from '../actions/GetNote.js';

import moment from 'moment';
import NavigationBar from '../components/NavigationBar';
const DetailNoteScreen = props => {
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

  useEffect(async () => {
    const note = await GetNoteAction(props.NoteID);
    console.log(note);

    setInputTitle(note.data.title);
    setInputSubTitle(note.data.subTitle);
    setInputNote(note.data.content);
    const noteRes = await GetAllNoteAction();
    console.log(noteRes.data);
  }, []);

  const inputTitleChange = title => {
    setInputTitle(title);
  };
  const inputSubTitleChange = subTitle => {
    setInputSubTitle(subTitle);
  };
  const inputNoteChange = note => {
    setInputNote(note);
  };

  return (
    <View>
      <NavigationBar />
      <TextInput
        placeholder="Note title"
        placeholderTextColor="#1f1c1cf8"
        onChangeText={inputTitleChange}
        value={inputTitle}
      />
      <Text style={styles.timestamp}>
        {moment().utcOffset('+07:00').format('LLLL')}
      </Text>
      <TextInput
        placeholder="Note subtitle"
        placeholderTextColor="#383a3bc0"
        onChangeText={inputSubTitleChange}
        value={inputSubTitle}
      />
      <TextInput
        placeholder="Type your note here"
        placeholderTextColor="#383a3bc0"
        onChangeText={inputNoteChange}
        value={inputNote}
      />
    </View>
  );
};
export default DetailNoteScreen;
