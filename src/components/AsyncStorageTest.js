/* eslint-disable*/

import {TextInput} from 'react-native';
import React, {Component, useState, useCallback, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, Alert} from 'react-native';
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
});

const AsyncStorageTest = () => {
  const [inputName, setInputName] = useState('');
  const [listName, setListName] = useState([]);
  const [retrieveData, setRetrieveData] = useState('');

  const contentChangeHandler = text => {
    setInputName(text);
  };

  const _storeData = async () => {
    try {
      const listname_stringify = JSON.stringify(listName);
      await AsyncStorage.setItem('listname', listname_stringify);
      setInputName('');
    } catch (error) {
      // Error saving data
      setRetrieveData('error input:' + error.message);
    }
  };

  const _retrieveData = async () => {
    try {
      const names = await AsyncStorage.getItem('listname');
      if (names !== null) {
        // We have data!!
        const list_name = JSON.parse(names);
        setListName(list_name);
      }
    } catch (error) {
      // Error retrieving data
      setRetrieveData('error retrieve:' + error.message);
    }
  };

  const saveName = () => {
    setListName(prevList => {
      return [{key: makeid(5), name: inputName}, ...prevList];
    });

    _storeData();
  };

  const deleteAllName = () => {
    setListName(prevList => {
      return [];
    });

    _storeData();
  };
  const reloadList = () => {
    loadListFromDatabase();
  };

  const loadListFromDatabase = async () => {
    _retrieveData();
  };

  return (
    <View style={styles.container}>
      <Text>{inputName}</Text>
      <FlatList
        data={listName}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
      />

      <TextInput
        placeholder="Input name"
        onChangeText={contentChangeHandler}
        value={inputName}
      />

      <Text>{retrieveData}</Text>
      <Button title="Reload" onPress={reloadList} />

      <Button title="Save name" onPress={saveName} />

      <Button title="Delete all name" onPress={deleteAllName} />
    </View>
  );
};
export default AsyncStorageTest;
