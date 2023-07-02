import React, { useState, useEffect } from "react";

import Icon1 from "react-native-vector-icons/Octicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/notes/NoteList";
import AppColors from "../utils/AppColors";

import { FAB } from "@react-native-material/core";
import { Image, StyleSheet, Switch, Text, View } from "react-native";
import { GetAllNoteAction, GetNoteAction } from './../actions/GetNote'
import { DeleteAllNoteAction } from "../actions/DeleteNote";
import DocumentPicker from "react-native-document-picker";
import ImagePicker from 'react-native-image-crop-picker';

const MainScreen = (props) => {
    const [taskItems, setTaskItems] = useState([]);
    const [imageSource,setImageSource]=useState('https://api.adorable.io/avatars/80/abott@adorable.png');

    const ChangeNotesLayoutHandler = () => {
        console.log("change notes layout (column to grids & vice versa)")
        // change notes display style 
    }

    const CreateChecklistNoteHandler = () => {
        console.log("checklist pressed!")
        // display create checklist note screen
    }

    const CreateImageNoteHandler =async () => {
        console.log("image note pressed!")
        // display create image note screen

        // try{
        // // const doc=await DocumentPicker.pick({
        // //     type:[DocumentPicker.types.images],
        // //     allowMultiSelection:false,
        // // });

        // const doc=await DocumentPicker.pickSingle({
        //     type:[DocumentPicker.types.images],
        // });

        // console.log(doc)
        // }
        // catch(err){
        //     console.log(err);
        //     if(DocumentPicker.isCancel(e)){
        //         console.log(e);
        //     }
        // }

        try{
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
              }).then(image => {
                console.log(image);
                setImageSource(image.path)
              });
        }
        catch(err){
            console.log(err)
        }

    }

    const CreateURLNoteHandler = () => {
        console.log("URL note pressed!")
        // display create URL note screen
        // DeleteAllNoteAction();
        // _retrieveData();
    }

    const CreateNoteHandler = () => {
        console.log("create note pressed!")
        // display create new note screen
        props.navigation.navigate('NewTask', {
            onGoBack: () => _retrieveData(),
        });
    }

    const _retrieveData = async () => {
        const names = await GetAllNoteAction();
        // console.log(names);
        if (names.result === 'success') {
            console.log(names);
            setTaskItems(names.data);
        }
    }

    useEffect(() => {
        _retrieveData();
    }, []);

    const screenNavigation = (ID) => {
        props.navigation.navigate('Detail', {
            ID: ID,
            onGoBack: () => _retrieveData(),
        });
    }

    return (
        <View style={styles.mainScreen}>
            <View style={styles.mainScreen__header}>
                <Text style={styles.mainScreen__title}>My Notes</Text>
                <Switch />
            </View>
            <SearchBar
                style={styles.mainScreen__searchBar}
                onChangeLayout={ChangeNotesLayoutHandler} />
            <NoteList style={styles.mainScreen__noteList} list={taskItems} screenNavigation={screenNavigation} />
            <Image source={{
                uri:imageSource
            }}/>
            <View style={styles.mainScreen__toolbar}>
                <Icon1
                    name="checklist"
                    {...styles.mainScreen__icon}
                    onPress={CreateChecklistNoteHandler} />
                <Icon2
                    name="image"
                    {...styles.mainScreen__icon}
                    size={30}
                    onPress={CreateImageNoteHandler} />
                <Icon1
                    name="globe"
                    {...styles.mainScreen__icon}
                    onPress={CreateURLNoteHandler} />
                <FAB
                    {...styles.mainScreen__newNoteFAB}
                    icon={
                        <Icon1 name="plus"
                            {...styles.mainScreen__icon} />}
                    onPress={CreateNoteHandler} />
            </View>
        </View >
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    mainScreen: {
        backgroundColor: AppColors.primaryDark,
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "space-between",
        height: "100%",
    },

    mainScreen__header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "5%",
        marginHorizontal: "3%",
    },

    mainScreen__title: {
        color: AppColors.textDark,
        fontSize: 25,
        fontWeight: 700,
    },

    mainScreen__searchBar: {
        flex: 1,
        marginBottom: "5%",
        marginHorizontal: "3%",
    },

    mainScreen__noteList: {
        flex: 12,
        backgroundColor: "transparent",
        marginBottom: "5%",
        marginHorizontal: "3%",
    },

    mainScreen__toolbar: {
        backgroundColor: AppColors.secondaryDark /*"#262626"*/,
        flex: 1.5,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "10%",
        paddingHorizontal: "3%",
    },

    mainScreen__icon: {
        backgroundColor: "transparent",
        size: 25,
        color: AppColors.iconDark,
        marginHorizontal: "3%"
    },

    mainScreen__newNoteFAB: {
        color: "#fcba03",
        variant: "standard",
        size: "default",
        marginLeft: "auto",
        marginRight: "5%",
        marginTop: "-7%",
        marginBottom: "auto"
    },
});