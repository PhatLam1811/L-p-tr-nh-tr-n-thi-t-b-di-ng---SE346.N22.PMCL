import React from "react";

import { Text, View } from "react-native";

const NoteList = (props) => {
    return (
        <View style={props.style}>
            <Text style={{ color: "black" }}> This is a note list</Text>
        </View >
    );
}

export default NoteList;