/* eslint-disable*/
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetNoteAction = async (ID) => {
    try {
  
        const noteData = await AsyncStorage.getItem('noteData'+ID);

        // return{result:'success',data:{title:title,subTitle:subTitle,content:content},ID:ID};
           return{result:'success',data:JSON.parse(noteData)};

  }catch(error){console.log(error)
  return{result:'fail',error:error};
}
}
  ;