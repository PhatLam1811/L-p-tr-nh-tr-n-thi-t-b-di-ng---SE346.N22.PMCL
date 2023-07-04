/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import Task from './Task';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { Button, TextInput, IconButton, Stack } from '@react-native-material/core';
import Icon from "react-native-vector-icons/Octicons";
import App from '../hiddenfolder/OutlineInput';
import AppColors from '../../utils/AppColors';


const NewTaskScreen = (props) => {
    const [task, setTask] = useState();


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
    }


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
        itemsCopy.splice(index, 1);
        props.setTaskItems(itemsCopy);
        
    }

    const HandleAddTask = async () => {
        props.setTaskItems([...props.taskItems, task]);

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
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                <Task text={item} />
                            </TouchableOpacity>
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


});

export default NewTaskScreen;
