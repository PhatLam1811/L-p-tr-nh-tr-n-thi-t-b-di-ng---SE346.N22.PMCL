import React from "react";

import { Switch, Text, View } from "react-native";
import { FAB } from "@react-native-material/core";

import Icon from "react-native-vector-icons/Octicons";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/notes/NoteList";

import styles from "../styles/MainScreen";

const MainScreen = () => {
    return (
        <View style={styles.mainScreen}>
            <View style={styles.mainScreen__header}>
                <Text style={styles.mainScreen__title}>My Notes</Text>
                <Switch />
            </View>
            <SearchBar />
            <NoteList />
            <View style={styles.mainScreen__toolbar}>
                <Icon
                    name="checklist"
                    {...styles.mainScreen__checklistShortcut}
                    onPress={() => { console.log("pressed1") }} />
                <Icon
                    name="image"
                    {...styles.mainScreen__checklistShortcut}
                    onPress={() => { console.log("pressed2") }} />
                <Icon
                    name="globe"
                    {...styles.mainScreen__checklistShortcut}
                    onPress={() => { console.log("pressed3") }} />
                <FAB
                    {...styles.mainScreen__newNoteFAB}
                    icon={props => <Icon name="plus" {...props} />} />
            </View>
        </View >
    );
};

export default MainScreen;