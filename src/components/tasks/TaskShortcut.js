import React, { useContext } from "react";

import AppContext from "../../utils/AppContext";
import Icon from "react-native-vector-icons/Octicons";

import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

const TaskShorcut = (props) => {
    const appContext = useContext(AppContext);

    const styles = StyleSheet.create({
        taskShorcut: {
            flexDirection: "row",
            width: "95%",
            height: 40,
            marginVertical: 5,
        },

        checkbox: {
            width: 24,
            height: 24,
            backgroundColor: 'transparent',
            borderRadius: 50,
            borderWidth: 1,
            borderColor: appContext.appTheme?.text,
            marginRight: 15,
            alignItems: "center"
        },

        checked: {
            width: 24,
            height: 24,
            backgroundColor: '#424242',
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "transparent",
            marginRight: 15,
            alignItems: "center"
        },

        text: {
            color: appContext.appTheme?.text,
        }
    })

    return (
        <TouchableOpacity style={styles.taskShorcut} onPress={() => props.onCheck(props.index)}>
            <View style={props.content.isFinished ? styles.checked : styles.checkbox}>
                {props.content.isFinished && <Icon name="check" size={24} style={{}} color={"#fff"} />}
            </View>
            <Text style={styles.text}>{props.content.toDo} </Text>
        </TouchableOpacity>
    );
}

export default TaskShorcut;