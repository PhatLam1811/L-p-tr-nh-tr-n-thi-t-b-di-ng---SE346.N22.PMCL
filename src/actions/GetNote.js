/* eslint-disable*/
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetNoteAction = async (ID) => {
    try {
        const title = await AsyncStorage.getItem('noteTitle'+ID);
        const subTitle = await AsyncStorage.getItem('noteSubTitle'+ID);
        const content = await AsyncStorage.getItem('noteContent'+ID);
  
        return{result:'success',data:{title:title,subTitle:subTitle,content:content},ID:ID};
  }catch(error){console.log(error)
  return{result:'fail',error:error};
}
}
  ;