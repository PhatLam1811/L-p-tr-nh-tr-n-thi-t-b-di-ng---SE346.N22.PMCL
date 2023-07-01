import React, { useState, useEffect } from "react";

import OctIcon from "react-native-vector-icons/Octicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/notes/NoteList";
import AppColors from "../utils/AppColors";

import { FAB } from "@react-native-material/core";
import { StyleSheet, Switch, Text, View } from "react-native";
import { GetAllNoteAction } from './../actions/GetNote'

const MainScreen = (props) => {
    const [notes, setNotes] = useState([]);
    const [isGridLayout, SetIsGridLayout] = useState(true);

    const ChangeNotesLayoutHandler = () => {
        console.log("change notes layout (column to grids & vice versa)")
        SetIsGridLayout(prev => !prev);
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

    const SearchNoteHandler = (input) => {
        console.log("on search: " + input);
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
        if (names.result === 'success') {
            setNotes(names.data);
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
                layout={isGridLayout ? "grid" : "column"}
                onSearch={SearchNoteHandler}
                onChangeLayout={ChangeNotesLayoutHandler} />
            <NoteList
                style={styles.mainScreen__noteList}
                list={notes}
                layout={isGridLayout ? "grid" : "column"}
                screenNavigation={screenNavigation} />
            <View style={styles.mainScreen__toolbar}>
                <OctIcon
                    name="checklist"
                    {...styles.mainScreen__icon}
                    onPress={CreateChecklistNoteHandler} />
                <MatIcon
                    name="image"
                    {...styles.mainScreen__icon}
                    size={30}
                    onPress={CreateImageNoteHandler} />
                <OctIcon
                    name="globe"
                    {...styles.mainScreen__icon}
                    onPress={CreateURLNoteHandler} />
                <FAB
                    {...styles.mainScreen__newNoteFAB}
                    icon={
                        <OctIcon name="plus"
                            {...styles.mainScreen__icon} />}
                    onPress={CreateNoteHandler} />
            </View>
        </View >
    );
};

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
    },

    mainScreen__toolbar: {
        flex: 1.5,
        backgroundColor: AppColors.secondaryDark,
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

export default MainScreen;
