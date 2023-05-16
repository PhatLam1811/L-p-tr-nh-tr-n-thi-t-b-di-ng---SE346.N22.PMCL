/* eslint-disable*/

import React, {Component, useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const NavigationBar = (props) => {
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
    backButton: {
      width: 18,
      height: 18,
    },
  });

  const onNavBtnPress=()=>{
    console.log('press nav')
  }
  return (
    // react native bắt buộc file ảnh phải cùng folder mà require nó
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <Image source={require('./returnicon.png')} style={styles.backButton} />
      </TouchableOpacity>
      <Text>navigation bar</Text>
    </View>
  );
};
export default NavigationBar;
