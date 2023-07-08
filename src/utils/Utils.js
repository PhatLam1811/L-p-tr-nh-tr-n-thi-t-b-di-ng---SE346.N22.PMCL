import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "../classes/Note";

import { SaveNoteAction } from "../actions/SaveNote";

function GenerateRandom(length) {
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

const GenerateSampleNotes = async (amount) => {
  try {
    for (let i = 0; i < amount; index++) {
      const ID = GenerateRandom(7)
      const newNote = Note.create(ID, "Untitled", "", "", "", new Date(), 'normal-note');

      if (newNote == null) {
        throw new Error("New note is null!");
      }

      const result = await SaveNoteAction(newNote);
      console.log("Save action result: " + result);
    }
  } catch (error) {
    console.log(error);
  }
}

const ClearData = async () => {
  try {
    const appDataKeys = await AsyncStorage.getAllKeys();
    console.log("App Data Keys: " + appDataKeys);
    AsyncStorage.multiRemove(appDataKeys, (result) => {
      console.log("Clear Data Result: " + result);
    });
  } catch (error) {
    console.log(error);
  }
}

const Utils = {
  GenerateRandom,
  GenerateSampleNotes,
  ClearData,
}

export default Utils;
