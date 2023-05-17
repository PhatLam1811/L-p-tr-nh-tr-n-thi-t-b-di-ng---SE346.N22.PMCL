/* eslint-disable*/
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
export const SaveNoteAction = async (noteData) => {

    const ID=makeid(7);

    try {
        await AsyncStorage.setItem(
          'noteTitle'+ID,
          noteData.title,
        );
        await AsyncStorage.setItem(
          'noteSubTitle'+ID,
          noteData.subTitle,
        );
        await AsyncStorage.setItem(
          'noteContent'+ID,
          noteData.content,
        );
        return{result:'success',data:noteData,ID:ID}
  }
  catch(error){console.log(error)
  return{result:'fail',error:error}

}}
;