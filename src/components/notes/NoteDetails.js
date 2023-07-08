import React, { useState,useEffect } from "react";

import AppColors from "../../utils/AppColors";
import moment from 'moment';
import TaskList from '../tasks/TaskList';
import TaskModel from '../../classes/Task.js';
import { View, StyleSheet, TextInput, Text } from "react-native";

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

const NoteDetails = (props) => {
    const lastUpdated = moment(new Date()).format("dddd, Do MMM YYYY h:mm a");
    const [taskItems, setTaskItems] 
        = useState([
        new TaskModel("watch walking dead ep6",false),
        new TaskModel("finished todo app",true),
        new TaskModel("report today tasks to PL",false),
        new TaskModel("jogging",false),
        new TaskModel("sleep at 10",false),

    ]);

    useEffect(() => 
    {
        console.log('taskItems after change at ntoedetails:' + JSON.stringify(taskItems));
    }, [taskItems] );
    
    return (
        
        <View style={styles.noteDetails}>
            <TextInput style={styles.noteDetails_title}
        
                maxLength={titleMaxLength}
                selectionColor={"#fcba03"}
                placeholder="Note Title"
                placeholderTextColor={AppColors.iconDark} />
            <Text style={styles.noteDetails_lastUpdated}>{lastUpdated}</Text>
            <SubTitleInput />
            {/* {

                taskItems.map((item, index) => {
                    console.log('on map 1 ' + item + " " + index);
                  
                })
            } */}
            {
                <TaskList taskItems = {taskItems} setTaskItems = {setTaskItems}></TaskList>
            }
            
            
        </View >
    );

 

};


const styles = StyleSheet.create({
    noteDetails: {
        flex: 8.3,
        paddingVertical: 0,
        paddingHorizontal: 10,
    },

    noteDetails_title: {
        color: AppColors.textDark,
        fontSize: 23,
        fontWeight: "600",
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
        backgroundColor: "blue",
        color: AppColors.textDark,
        width: "98%",
        height: 50,
        fontSize: 18,
        marginHorizontal: 3,
        paddingVertical: 1,
    }
});

export default NoteDetails;