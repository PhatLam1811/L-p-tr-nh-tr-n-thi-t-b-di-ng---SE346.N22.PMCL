/* eslint-disable*/
import AsyncStorage from '@react-native-async-storage/async-storage';


export const GetNoteAction = async (ID) => {
    try {
  
        const noteData = await AsyncStorage.getItem('noteData'+ID);

        // return{result:'success',data:{title:title,subTitle:subTitle,content:content},ID:ID};
           return{result:'success',data:JSON.parse(noteData)};

  }catch(error){console.log(error)
  return{result:'fail',error:error};
}};

export const GetAllNoteAction = async () => {
    try {
      let notes=[];
      const allKeys=await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(allKeys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          console.log(key);
          const jsonData=JSON.parse(value);
notes.push(jsonData);
        });
      });

      return{result:'success',data:notes};


  }catch(error){console.log(error)
  return{result:'fail',error:error};
}};