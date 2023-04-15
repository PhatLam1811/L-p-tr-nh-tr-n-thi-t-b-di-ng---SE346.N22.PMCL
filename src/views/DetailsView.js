/* eslint-disable*/

import React, {Component, useState, useCallback, useEffect} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const DetailsView = () => {
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

  const [inputName, setInputName] = useState('');
  const [listName, setListName] = useState([]);
  const [retrieveData, setRetrieveData] = useState('');
  return (
    <View>
      <NavigationBar />
      <TextInput placeholder="Note title" placeholderTextColor="#1f1c1cf8" />
      <Text style={styles.timestamp}>
        {moment().utcOffset('+07:00').format('LLLL')}
      </Text>
      <TextInput placeholder="Note subtitle" placeholderTextColor="#383a3bc0" />
      <TextInput
        placeholder="Type your note here"
        placeholderTextColor="#383a3bc0"
      />
    </View>
  );
};
export default DetailsView;
