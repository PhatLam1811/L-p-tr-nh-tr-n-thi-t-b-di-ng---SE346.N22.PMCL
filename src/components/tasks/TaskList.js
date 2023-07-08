/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import Task from './Task';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Button,
    Clipboard
} from 'react-native';

import {
    Stack,
    TextInput, IconButton, Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
} from '@react-native-material/core';
import Icon from "react-native-vector-icons/Octicons";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import TaskModel from '../../classes/Task.js';
import AppColors from '../../utils/AppColors.js';



const EditNoteHandler = (toDo) => {

    console.log("who am i?");

}

const CopyNoteHandler = (item) => {
    console.log("Copy Note");
    Clipboard.setString(item);

}
const supportedURL = 'https://google.com/search?q=';

// const ShareNoteHandler = useCallback(async () => {
//         // Checking if the link is supported for links with custom URL scheme.
//         const supported = await Linking.canOpenURL(supportedURL);

//         if (supported) {
//           // Opening the link with some app, if the URL scheme is "http" the web link should be opened
//           // by some browser in the mobile
//           await Linking.openURL(supportedURL);
//         } else {
//           Alert.alert(`Don't know how to open this URL: ${supportedURL}`);
//         }
//       }
// );

const WebSearch = async (item) => {
    // Checking if the link is supported for links with custom URL scheme.
    let valueINeed = (supportedURL + item);
    console.log(valueINeed);
    const supported = await Linking.canOpenURL(valueINeed);


    console.log(supported);
    await Linking.openURL(valueINeed);


};

const NewTaskScreen = (props) => {
    const [task, setTask] = useState();
    const [visible, setVisible] = useState(false);

    const _retrieveData = async () => {
        console.log("im retrieving...");

        //const names = await GetAllNoteAction();
        // if (names.result === 'success') {
        //     console.log(names.data);
        //     setTaskItems(names.data);
        // }

    }

    const completeTask = async (index) => {
        console.log('called');
        let itemsCopy = [...props.taskItems];
        itemsCopy[index].isFinished = !itemsCopy[index].isFinished;
        props.setTaskItems(itemsCopy);

    }
    const deleteTask = async (index) => {
        console.log('called');
        let itemsCopy = [...props.taskItems];
        itemsCopy.splice(index, 1);
        props.setTaskItems(itemsCopy);

    }
    const HandleAddTask = async () => {
        props.setTaskItems([...props.taskItems, new TaskModel(task, false)]);

        console.log('taskItems before change:' + JSON.stringify(props.taskItems));
        //const saveData = await SaveNoteAction(itemsCopy);

        //Keyboard.dismiss();
        //setTaskItems([...taskItems, task]);
        //props.setTaskItems([...taskItems,task]);

        setTask(null);

    };

    useEffect(() => {
        console.log('taskItems after change:' + JSON.stringify(props.taskItems));
        //props.taskItems = taskItems;
        console.log('set props.items');
    }, [props.taskItems]);

    const screenNavigation = (ID) => {
        props.navigation.navigate('Detail', {
            ID: ID,
            onGoBack: () => _retrieveData(),
        });
    }



    return (
        <View >

            <View>
                <TextInput
                    style={{}}
                    label='Add task'
                    placeholder={'Write a task'}
                    value={task}
                    onChangeText={text => {
                        setTask(text);
                    }}
                    variant="outlined"
                    trailing={
                        props => (
                            <IconButton
                                onPress={HandleAddTask}
                                icon={props => <Icon name="plus" {...props} />} {...props}

                            />
                        )}
                />
            </View>

            <View style={styles.items}>
                {

                    props.taskItems.map((item, index) => {


                        return (
                            <View>
                                <Menu key={index} >
                                    <MenuTrigger triggerOnLongPress
                                        onAlternativeAction={() => completeTask(index)}
                                        customStyles={{
                                            TriggerTouchableComponent: TouchableOpacity,
                                            triggerWrapper: styles.noteCard,
                                        }}>
                                        {
                                            <Task isFinished={item.isFinished} text={item.toDo} />
                                        }
                                    </MenuTrigger>

                                    <MenuOptions style={styles.noteCard_popupMenu}>
                                        <Text style={styles.popupMenu_title}>{item.toDo}</Text>
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={setVisible} value={true} text="Edit Item" />
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={WebSearch} value={item.toDo} text="Web Search" />
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={CopyNoteHandler} value={item.toDo} text="Copy To Clipboard" />
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={deleteTask} value={index} text="Delete Note" />
                                    </MenuOptions>
                                </Menu >

                            </View>

                        )
                    })

                }
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    items: {
        //marginTop: 30
    },

    taskContent: {
        height: "100%",
        flex: 1,
        backgroundColor: "transparent",
        marginHorizontal: "3%",
    },
    noteCard: {
        flexDirection: "column",
        backgroundColor: AppColors.secondaryDark,
        color: AppColors.textDark,
        width: "100%",
        height: "auto",
        marginBottom: "5%",
        borderRadius: 10,
    },

    noteCard__image: {
        width: "100%",
        aspectRatio: 3 / 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    noteCard__content: {
        flexDirection: "column",
        padding: 10,
    },

    noteCard_title: {
        color: AppColors.textDark,
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 10,
    },

    noteCard_subTitle: {
        color: AppColors.textDark,
        flexWrap: "wrap",
        marginBottom: 10,
    },

    noteCard_lastUpdated: {
        color: AppColors.textDark,
        fontSize: 10,
    },

    noteCard_popupMenu: {
        backgroundColor: AppColors.secondaryDark,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        height: 190,
    },

    popupMenu_title: {
        color: "#fcba03",
        padding: 10,
    },

    popupMenu_options: {
        optionWrapper: {
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 0,
        },
        optionText: {
            color: AppColors.textDark,
            paddingHorizontal: 10,
        },
    },



});

export default NewTaskScreen;
