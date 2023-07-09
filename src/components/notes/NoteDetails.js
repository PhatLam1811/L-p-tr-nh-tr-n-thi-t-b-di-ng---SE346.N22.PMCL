import React, { useState, useEffect } from "react";

import AppColors from "../../utils/AppColors";
import moment from 'moment';
import TaskList from '../tasks/TaskList';
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { View, StyleSheet, TextInput, Text, Image } from "react-native";

const titleMaxLength = 50;
const subTitleMaxLength = 70;

const NoteDetails = (props) => {
    const noteData = {
        title: props.note.title,
        subTitle: props.note.subTitle,
        colorTag: props.note.colorTag,
        lastUpdated: moment(props.note.lastUpdated).format("dddd, Do MMM YYYY, h:mm a"),
        content: props.note.content,
        image: props.note.image,
        url: props.note.url,
        tasks: props.note.tasks,
    }
    const [imageRatio, setImageRatio] = useState(0);
    const [taskItems, setTaskItems]
        = useState();

    const OnImageLoadHandler = ({ nativeEvent: { source: { width, height } } }) => {
        setImageRatio(width / height);
    }

    // useEffect(() => {
    //     console.log('taskItems after change at ntoedetails:' + JSON.stringify(taskItems));
    // }, [taskItems]);

    return (

        <View style={styles.noteDetails}>
            <TextInput style={styles.noteDetails_title}
                maxLength={titleMaxLength}
                selectionColor={"#fcba03"}
                value={noteData.title}
                onChangeText={text => props.onTitleChange(text)}
                placeholder="Note Title"
                placeholderTextColor={AppColors.iconDark} />
            <Text style={styles.noteDetails_lastUpdated}>{noteData.lastUpdated}</Text>
            <View style={styles.noteDetails_subTitle}>
                <View style={{ ...styles.subTitle_colorTag, backgroundColor: noteData.colorTag }} />
                <TextInput style={styles.subTitle_content}
                    editable
                    multiline
                    maxLength={subTitleMaxLength}
                    selectionColor={"#fcba03"}
                    value={noteData.subTitle}
                    onChangeText={text => props.onSubTitleChange(text)}
                    placeholder="Note Subtitle"
                    placeholderTextColor={AppColors.iconDark} />
            </View>
            <View style={styles.noteDetails_content}>
                {noteData.image != null && <View>
                    <Image
                        style={{
                            width: "98%",
                            aspectRatio: imageRatio,
                        }}
                        onLoad={OnImageLoadHandler}
                        source={{ uri: noteData.image }}
                        resizeMode="stretch" />
                    <MatComIcon style={styles.content_imageDeleteIcon}
                        name="trash-can"
                        color="red"
                        size={30}
                        onPress={() => props.onImageDelete()} />
                </View>}
                <TextInput style={styles.content_text}
                    editable
                    multiline
                    value={noteData.content}
                    onChangeText={text => props.onContentChange(text)}
                    selectionColor={"#fcba03"}
                    placeholder="Type Your Note Here"
                    placeholderTextColor={AppColors.iconDark} />
                {noteData.tasks != null &&
                    <TaskList
                        taskItems={noteData.tasks}
                        setTaskItems={setTaskItems} />}
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    noteDetails: {
        backgroundColor: "transparent",
        color: AppColors.textDark,
        height: "100%",
        paddingVertical: 0,
        paddingHorizontal: 10,
    },

    noteDetails_title: {
        color: AppColors.textDark,
        fontSize: 23,
        fontWeight: "600",
    },

    noteDetails_subTitle: {
        flexDirection: "row",
        color: AppColors.textDark,
        marginVertical: 20,
        marginHorizontal: 3,
    },

    noteDetails_lastUpdated: {
        color: AppColors.iconDark,
        fontSize: 16,
        paddingStart: 3,
    },

    subTitle_container: {
        flexDirection: "row",
        marginVertical: 20,
        marginHorizontal: 3,
    },

    subTitle_colorTag: {
        borderRadius: 10,
        width: 5,
    },

    subTitle_content: {
        color: AppColors.textDark,
        width: "98%",
        minHeight: 50,
        height: "auto",
        fontSize: 18,
        marginHorizontal: 3,
    },

    content_imageDeleteIcon: {
        backgroundColor: "white",
        position: "absolute",
        top: 10,
        right: 20,
        padding: 5,
        borderRadius: 50,
    },

    content_text: {
        color: AppColors.textDark,
        width: "98%",
        minHeight: 50,
        height: "auto",
        marginHorizontal: 3,
        textAlign: "justify",
        fontSize: 18,
    },
});

export default NoteDetails;