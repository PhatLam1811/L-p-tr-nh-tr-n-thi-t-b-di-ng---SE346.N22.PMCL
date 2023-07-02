import React, {useState, useEffect} from 'react';

import {Text, TouchableOpacity, View, FlatList, StyleSheet} from 'react-native';
import {
  DeleteAllNoteAction,
  DeleteNoteAction,
} from './../../actions/DeleteNote';

import Task from './../tasks/Task';

const NoteList = props => {
  const [notes, setNotes] = useState([]);
  //console.log(props.list);

  const openTask = async index => {
    // console.log("index is being deleted:" + index);
    // let itemsCopy = [...notes];
    // itemsCopy.splice(index,1);
    // setNotes([...itemsCopy]);
    // await DeleteNoteAction(notes[index].ID);

    props.screenNavigation(props.list[index].ID);
  };

  // useEffect(() => {
  //     console.log('porops list is: ');
  //     setNotes(props.list);
  // }, [props]);

  return (
    <View style={props.style}>
      <View style={styles.container}>
        {props.list.map((item, index) => {
          // console.log('item is: ');
          // console.log(item);
          // console.log('index is: ');
          // console.log(index);
          return (
            <View style={styles.item}>
              {item ? (
                <TouchableOpacity key={index} onPress={() => openTask(index)}>
                  <Task text={item.noteData} />
                </TouchableOpacity>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    margin: 5,
    alignSelf: 'center',
    width: '48%',
  },
});

export default NoteList;
