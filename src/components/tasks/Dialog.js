import React, { useContext, useEffect, useRef, useState } from "react";

import AppContext from "../../utils/AppContext";

import OctIcon from 'react-native-vector-icons/Octicons';

import { View, Modal, Text, StyleSheet, TextInput, Pressable, Keyboard } from "react-native";

const AddURLDialog = (props) => {
    const httpsRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    const appContext = useContext(AppContext);

    const [urlInput, setUrlInput] = useState();

    useEffect(() => setUrlInput(props.task.toDo), [props.isVisible]);

    const styles = StyleSheet.create({
        urlDialogBackground: {
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
        },

        urlDialog: {
            backgroundColor: "rgba(0, 0, 0, 0.90)",
            width: 300,
            padding: 20,
            borderRadius: 5,
        },

        urlDialogText: {
            color: '#fff',
            fontSize: 17.5,
            fontWeight: 500,
        },

        urlDialogIcon: {
            backgroundColor: 'transparent',
            color: '#fff',
            size: 23,
            marginEnd: 15,
        },

        urlDialogAction: {
            color: "#fcba03",
            fontSize: 16,
            fontWeight: 500,
        },
    });
   
    return (
        <Modal visible={props.isVisible} transparent={true} >
            <Pressable style={styles.urlDialogBackground} onPress={() => props.setIsVisible(false)}>
                <View style={styles.urlDialog}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                        <OctIcon name="globe" {...styles.urlDialogIcon} />
                        <Text style={styles.urlDialogText}>Edit</Text>
                    </View>
                    <TextInput
                        style={styles.urlDialogText}
                        value={urlInput}

                        autoFocus={true}
                        onChangeText={(text) => setUrlInput(text)}
                        placeholderTextColor={appContext.appTheme?.icon}
                        selectionColor={"#fcba03"}
                        inputMode="url" />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginTop: 5 }}>
                        <Pressable onPress={() => props.setIsVisible(false)}>
                            <Text style={{ ...styles.urlDialogAction, marginEnd: 20 }}>CANCEL</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            props.task.toDo = urlInput;
                            props.setIsVisible(false);
                        }

                        }>
                            <Text style={styles.urlDialogAction}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal >
    )
}

export default AddURLDialog;