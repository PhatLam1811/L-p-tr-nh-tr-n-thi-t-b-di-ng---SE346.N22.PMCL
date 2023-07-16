import React, { useState, useEffect } from "react";

import AppColors from "../../utils/AppColors";
import TaskList from '../tasks/TaskList';
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Provider,
    TextInput as MyTextPut
} from '@react-native-material/core';

import { View, StyleSheet, TextInput, Text, Image } from "react-native";

const titleMaxLength = 50;
const subTitleMaxLength = 70;

const NoteDetails = (props) => {

    const [dialogId,setDialogId] = useState(0);
    const [dialogValue,setDialogValue] = useState("");

    const [visible, setVisible] = useState(false);
    const ShowNoteDialog = (id) => {
        setVisible(true);
        setDialogId(id);
        setDialogValue(note.tasks[id].toDo)
    }

    const note = {
        title: props.note.title,
        subTitle: props.note.subTitle,
        colorTag: props.note.colorTag,
        lastUpdated: props.note.lastUpdated,
        content: props.note.content,
        image: props.note.image,
        url: props.note.url,
        tasks: props.note.tasks,
    }


    // useEffect(() => {
    //     console.log('taskItems after change at ntoedetails:' + JSON.stringify(taskItems));
    // }, [taskItems]);

    return (
        <Provider>
            {
                visible ?
                    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                        <DialogHeader title="Edit" />
                        <DialogContent>
                            <MyTextPut value={dialogValue} onChangeText={text => { setDialogValue(text) }} />


                        </DialogContent>
                        <DialogActions>
                            <Button
                                title="Cancel"
                                compact
                                variant="text"
                                onPress={() => setVisible(false)}
                            />
                            <Button
                                title="Ok"
                                compact
                                variant="text"
                                onPress={() => {
                                    let items = note.tasks;
                                    items[dialogId].toDo = dialogValue;
                                    console.log(items[dialogId].toDo);

                                    note.tasks = items
                                    //setTaskItems(items);
                                    setVisible(false);


                                }
                                }
                            />
                        </DialogActions>
                    </Dialog>
                    : null
            }
            <View style={styles.noteDetails}>
                <TextInput style={styles.noteDetails_title}
                    maxLength={titleMaxLength}
                    selectionColor={"#fcba03"}
                    value={note.title}
                    onChangeText={text => props.onTitleChange(text)}
                    placeholder="Note Title"
                    placeholderTextColor={AppColors.iconDark} />
                <Text style={styles.noteDetails_lastUpdated}>{note.lastUpdated}</Text>
                <View style={styles.noteDetails_subTitle}>
                    <View style={{ ...styles.subTitle_colorTag, backgroundColor: note.colorTag }} />
                    <TextInput style={styles.subTitle_content}
                        editable
                        multiline
                        maxLength={subTitleMaxLength}
                        selectionColor={"#fcba03"}
                        value={note.subTitle}
                        onChangeText={text => props.onSubTitleChange(text)}
                        placeholder="Note Subtitle"
                        placeholderTextColor={AppColors.iconDark} />
                </View>
                <View style={styles.noteDetails_content}>
                    {note.image != null && <View>
                        <Image
                            style={{
                                width: "98%",
                                aspectRatio: note.image.width / note.image.height,
                            }}
                            // complete={() => OnImageLoadHandler()}
                            source={{ uri: note.image.uri }}
                            resizeMode="stretch" />
                        <MatComIcon style={styles.content_imageDeleteIcon}
                            name="trash-can"
                            color="red"
                            size={30}
                            onPress={() => props.onImageDelete()} />
                    </View>}
                    {note.tasks == null && <TextInput style={styles.content_text}
                        editable
                        multiline
                        value={note.content}
                        onChangeText={text => props.onContentChange(text)}
                        selectionColor={"#fcba03"}
                        placeholder="Type Your Note Here"
                        placeholderTextColor={AppColors.iconDark} />}
                   
                    
                    {
                        
                    note.tasks != null &&
                        <TaskList
                            taskItems={note.tasks} 
                            setVisible={ShowNoteDialog} 
                            onTaskChange = {props.onTaskChange}
                             />
                             
                             }
                </View>
            </View >
        </Provider>
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