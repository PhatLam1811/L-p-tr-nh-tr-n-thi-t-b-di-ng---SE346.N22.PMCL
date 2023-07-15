import React from "react";

import AppColors from "../utils/AppColors";

import { Pressable, StyleSheet, Text, View } from "react-native";

const Mischellaneous = ({ navigation }) => {
    return (
        <View>
            <Pressable style={styles.mischellaneous} onPress={() => navigation.toggleDrawer()}>
                <Text style={styles.mischellaneous_text}>Mischellaneous</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    mischellaneous: {
        backgroundColor: AppColors.primaryDark,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    mischellaneous_text: {
        color: AppColors.textDark,
        fontSize: 17,
    },
});

export default Mischellaneous;