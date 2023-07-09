/* eslint-disable*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../classes/Note';


export const GetNoteAction = async (ID) => {
  try {

    const noteData = await AsyncStorage.getItem('Note_' + ID);
    if (jsonData === null || jsonData === undefined) {
      console.log('Something wrong with noteData in GetNoteAction');
      console.log(noteData);
      return;
    }
    return { result: 'success', data: JSON.parse(noteData) };

  } catch (error) {
    console.log(error)
    return { result: 'fail', error: error };
  }
};

export const GetAllNoteAction = async () => {
  try {
    let notes = [];

    const allKeys = await AsyncStorage.getAllKeys();

    const data = await AsyncStorage.multiGet(allKeys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let value = store[i][1];

        const note = JSON.parse(value);

        if (note === null || note === undefined) return;

        notes.push(note);
      });
    });

    return { result: 'success', data: notes };
  }
  catch (error) {
    console.log(error)
    return { result: 'fail', error: error };
  }
};