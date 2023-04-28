import React from "react";

import { Switch, Text, View } from "react-native";

import SearchBar from "../components/SearchBar";
import NoteList from "../components/notes/NoteList";

const MainScreen = () => {
    return (
        <View>
            <View>
                <Text>This is main screen</Text>
                <Switch />
            </View>
            <SearchBar />
            <NoteList />
            <View>
                <Text>This is main screen's toolbar</Text>
            </View>
        </View >
    );
};

export default MainScreen;