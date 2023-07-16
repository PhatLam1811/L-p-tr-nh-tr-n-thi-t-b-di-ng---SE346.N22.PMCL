import React, { useContext, useEffect, useRef, useState } from "react";

import AppContext from "../utils/AppContext";
import AppColors from "../utils/AppColors";
import OctIcon from 'react-native-vector-icons/Octicons';

import { View, Modal, Text, StyleSheet, TextInput, Pressable, Keyboard } from "react-native";

const AddURLDialog = (props) => {
    const httpsRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    const nonHttpsRegex = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    const appContext = useContext(AppContext);

    const [urlInput, setUrlInput] = useState("");

    const AddURLHandler = () => {
        Keyboard.dismiss();
        if (urlInput.trim().match(httpsRegex) != null ||
            urlInput.trim().match(nonHttpsRegex) != null) {
            props.onUrlAdded(urlInput);
            props.setIsVisible(false);
        } else {
            appContext.callSnackBar({
                type: "error",
                message: "Please enter a valid URL",
            });
        }
    }

    useEffect(() => setUrlInput(""), [props.isVisible]);

    return (
        <Modal visible={props.isVisible} transparent={true} >
            <Pressable style={styles.urlDialogBackground} onPress={() => props.setIsVisible(false)}>
                <View style={styles.urlDialog}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                        <OctIcon name="globe" {...styles.urlDialogIcon} />
                        <Text style={styles.urlDialogText}>Add URL</Text>
                    </View>
                    <TextInput
                        style={styles.urlDialogText}
                        value={urlInput}
                        autoFocus={true}
                        onChangeText={(text) => setUrlInput(text)}
                        placeholder="Enter URL"
                        placeholderTextColor={AppColors.iconDark}
                        selectionColor={"#fcba03"}
                        inputMode="url" />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginTop: 5 }}>
                        <Pressable onPress={() => props.setIsVisible(false)}>
                            <Text style={{ ...styles.urlDialogAction, marginEnd: 20 }}>CANCEL</Text>
                        </Pressable>
                        <Pressable onPress={AddURLHandler}>
                            <Text style={styles.urlDialogAction}>ADD</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal >
    )
}

const styles = StyleSheet.create({
    urlDialogBackground: {
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },

    urlDialog: {
        backgroundColor: AppColors.secondaryDark,
        width: 300,
        padding: 20,
        borderRadius: 5,
    },

    urlDialogText: {
        color: AppColors.textDark,
        fontSize: 17.5,
        fontWeight: 500,
    },

    urlDialogIcon: {
        backgroundColor: 'transparent',
        color: AppColors.textDark,
        size: 23,
        marginEnd: 15,
    },

    urlDialogAction: {
        color: "#fcba03",
        fontSize: 16,
        fontWeight: 500,
    },
});

export default AddURLDialog;