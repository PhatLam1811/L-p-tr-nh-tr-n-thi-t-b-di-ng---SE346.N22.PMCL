import React, { useEffect, useRef, useState } from "react";

import AppColors from "../utils/AppColors";
import OctIcon from 'react-native-vector-icons/Octicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const Mischellaneous = (props) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);

    const ToggleMischellaneousBar = () => {
        if (isVisible === false) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsVisible(true));
        }
        else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsVisible(false));
        }
    }

    const OptionHandler = (callback) => {
        callback();
        ToggleMischellaneousBar();
    }

    return (
        <Animated.View style={{
            ...styles.mischellaneous,
            transform: [
                {
                    translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [255, props.isCreateNote === true ? 50 : 0]
                    })
                }]
        }}>
            <Pressable style={styles.mischellaneousToggleButton} onPress={ToggleMischellaneousBar}>
                <Text style={styles.mischellaneous_text}>Mischellaneous</Text>
            </Pressable>
            <View style={styles.mischellaneousColorPicker}>
            </View>
            <Pressable style={styles.mischellaneousOption}>
                <OctIcon
                    name="checklist"
                    {...styles.mischellaneousIcon}
                />
                <Text style={styles.mischellaneous_text}>Add Checklist</Text>
            </Pressable>
            <Pressable style={styles.mischellaneousOption} onPress={() => OptionHandler(props.addImage)}>
                <MatIcon name="image" {...styles.mischellaneousIcon} />
                <Text style={styles.mischellaneous_text}>Add Image</Text>
            </Pressable>
            <Pressable style={styles.mischellaneousOption} >
                <OctIcon name="globe" {...styles.mischellaneousIcon} />
                <Text style={styles.mischellaneous_text}>Add Url</Text>
            </Pressable>
            <Pressable style={styles.mischellaneousOption} onPress={() => OptionHandler(props.deleteNote)}>
                <MatComIcon
                    name="trash-can"
                    {...styles.mischellaneousIcon}
                    color="red"
                    size={30} />
                <Text style={styles.mischellaneous_text}>Delete Note</Text>
            </Pressable>
        </Animated.View >
    );
}

const styles = StyleSheet.create({
    mischellaneous: {
        backgroundColor: AppColors.primaryDark,
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    mischellaneousToggleButton: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    mischellaneous_text: {
        color: AppColors.iconDark,
        fontSize: 17,
    },

    mischellaneousColorPicker: {
        backgroundColor: "blue",
        width: "100%",
        height: 50,
    },

    mischellaneousOption: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
    },

    mischellaneousIcon: {
        color: AppColors.iconDark,
        size: 30,
        marginHorizontal: 15,
    },
});

export default Mischellaneous;