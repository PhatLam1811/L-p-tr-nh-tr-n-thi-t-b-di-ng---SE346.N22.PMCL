import React, { useState } from "react";

import AppColors from "../utils/AppColors";
import OctIcon from 'react-native-vector-icons/Octicons';

import { View, Modal, Text, StyleSheet, TextInput, Pressable } from "react-native";

const AddURLDialog = (props) => {
    const [urlInput, setUrlInput] = useState("");



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
                        onChangeText={(text) => setUrlInput(text)}
                        selectionColor={"#fcba03"} />
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginTop: 5 }}>
                        <Pressable onPress={() => props.setIsVisible(false)}>
                            <Text style={{ ...styles.urlDialogAction, marginEnd: 20 }}>CANCEL</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.urlDialogAction}>ADD</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Modal>
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