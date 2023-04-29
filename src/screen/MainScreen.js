import React from "react";

import { StyleSheet, Switch, Text, View } from "react-native";
import { FAB } from "@react-native-material/core";

import Icon1 from "react-native-vector-icons/Octicons";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/notes/NoteList";

const MainScreen = () => {
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
            <NoteList style={styles.mainScreen__noteList} />
            <View style={styles.mainScreen__toolbar}>
                <Icon1
                    name="checklist"
                    {...styles.mainScreen__checklistIcon}
                    onPress={CreateChecklistNoteHandler} />
                <Icon2
                    name="image"
                    {...styles.mainScreen__imageIcon}
                    onPress={CreateImageNoteHandler} />
                <Icon1
                    name="globe"
                    {...styles.mainScreen__globeIcon}
                    onPress={CreateURLNoteHandler} />
                <FAB
                    {...styles.mainScreen__newNoteFAB}
                    icon={props => <Icon1 name="plus" {...props} />}
                    onPress={CreateNoteHandler} />
            </View>
        </View >
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    mainScreen: {
        backgroundColor: "#1c1c1c",
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

    mainScreen__searchBar: {
        flex: 1,
        marginBottom: "5%",
        marginHorizontal: "3%",
    },

    mainScreen__noteList: {
        flex: 12,
        backgroundColor: "yellow",
        marginBottom: "5%",
        marginHorizontal: "3%",
    },

    mainScreen__title: {
        color: "white",
        fontSize: 25,
        fontWeight: 700,
    },

    mainScreen__toolbar: {
        flex: 1.5,
        backgroundColor: "#262626",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "10%",
        paddingHorizontal: "3%",
    },

    mainScreen__checklistIcon: {
        backgroundColor: "transparent",
        size: 25,
        marginHorizontal: "3%"
    },

    mainScreen__imageIcon: {
        backgroundColor: "transparent",
        size: 30,
        marginHorizontal: "3%"
    },

    mainScreen__globeIcon: {
        backgroundColor: "transparent",
        size: 25,
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
    }
});