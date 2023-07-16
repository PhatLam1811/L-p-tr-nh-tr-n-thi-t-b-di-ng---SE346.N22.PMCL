import React, { useState, useEffect } from "react";

import AppColors from "../../utils/AppColors";
import moment from 'moment';
import TaskList from '../tasks/TaskList';
import TaskModel from '../../classes/Task.js';
import { View, StyleSheet, TextInput, Text } from "react-native";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Provider,
    TextInput as MyTextPut
} from '@react-native-material/core';

const titleMaxLength = 50;
const subTitleMaxLength = 70;

const SubTitleInput = (props) => {
    const [inputHeight, setInputHeight] = useState(30);

    const SubTitleInputLayoutChangeHandler = (event) => {
        console.log("layout change");
        setInputHeight(50);
    }

    return (


        <View style={styles.subTitle_container}>


            <View style={{ ...styles.subTitle_colorTag, height: inputHeight, backgroundColor: "red" }} />
            <TextInput style={styles.subTitle_content}
                multiline={true}
                maxLength={subTitleMaxLength}
                selectionColor={"#fcba03"}
                placeholder="Note Subtitle"
                placeholderTextColor={AppColors.iconDark}
                onLayout={SubTitleInputLayoutChangeHandler} />
        </View>
    );
};



const NoteTaskDetails = (props) => {
    const [imageRatio, setImageRatio] = useState(0);
    const lastUpdated = moment(new Date()).format("dddd, Do MMM YYYY h:mm a");
    // const [taskItems, setTaskItems]
    //     = useState([
    //         new TaskModel("watch walking dead ep6", false),
    //         new TaskModel("finished todo app", true),
    //         new TaskModel("report today tasks to PL", false),
    //         new TaskModel("jogging", false),
    //         new TaskModel("sleep at 10", false),

    //     ]);
    const [dialogId,setDialogId] = useState(0);
    const [dialogValue,setDialogValue] = useState("");

    const [visible, setVisible] = useState(false);
    const ShowNoteDialog = (id) => {
        setVisible(true);
        setDialogId(id);
        setDialogValue(props.taskItems[id].toDo)
    }

    useEffect(() => {
        console.log('taskItems changed');
    }, [props.taskItems]);


    return (
        <>
            <Provider>

                {
                    visible ?
                        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                            <DialogHeader title="Edit" />
                            <DialogContent>
                                <MyTextPut value={dialogValue} onChangeText={text =>{setDialogValue(text)}}/>
                                    
                                
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
                                        let items = props.taskItems;
                                        items[dialogId].toDo = dialogValue;
                                        console.log(items[dialogId].toDo);
                                        props.setTaskItems(items);    
                                        setVisible(false);
                                        

                                    }
                                    }
                                />
                            </DialogActions>
                        </Dialog>
                        : null
                }
                <View style={styles.noteDetails}>
                  
                    {
                        <TaskList taskItems={props.taskItems} setVisible={ShowNoteDialog} setTaskItems={props.setTaskItems}></TaskList>
                    }


                </View >
            </Provider>
        </>

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

export default NoteTaskDetails;