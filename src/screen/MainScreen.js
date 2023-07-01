import React, { useState, useEffect } from "react";

import Icon1 from "react-native-vector-icons/Octicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/notes/NoteList";
import AppColors from "../utils/AppColors";

import { FAB } from "@react-native-material/core";
import { StyleSheet, Switch, Text, View } from "react-native";
import { GetAllNoteAction, GetNoteAction } from './../actions/GetNote'

const MainScreen = (props) => {
    const [taskItems, setTaskItems] = useState([]);

    const ChangeNotesLayoutHandler = () => {
        console.log("change notes layout (column to grids & vice versa)")
        // change notes display style 
    }

    const CreateChecklistNoteHandler = () => {
        console.log("checklist pressed!")
        // display create checklist note screen
    }

    const CreateImageNoteHandler = () => {
        console.log("image note pressed!")
        // display create image note screen
    }

    const CreateURLNoteHandler = () => {
        console.log("URL note pressed!")
        // display create URL note screen
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
            // console.log(names.data);
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