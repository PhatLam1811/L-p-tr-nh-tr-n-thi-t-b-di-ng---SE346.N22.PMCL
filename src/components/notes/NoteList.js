/* eslint-disable*/


import React from "react";

import { Text, View,FlatList } from "react-native";
import { GetAllNoteAction } from "../../actions/GetNote";

const NoteList = (props) => {

    return (
        <View style={props.style}>
            
            <Text style={{ color: "black" }}> This is a note list</Text>
        </View >
    );
}

export default NoteList;