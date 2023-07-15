import React, { useEffect, useRef } from "react";

import AppColors from "../utils/AppColors";
import OctIcon from "react-native-vector-icons/Octicons";
import FaIcon from "react-native-vector-icons/FontAwesome";

import { Animated, View, StyleSheet, Text } from "react-native";

const CustomSnackBar = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const snackBarAnimation = Animated.sequence([
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }),
        Animated.delay(3000),
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        })
    ]);

    useEffect(() => {
        snackBarAnimation.start(() => props.onHideSnackBar());
    }, [fadeAnim]);

    return (
        <Animated.View style={{ ...styles.snackBar, opacity: fadeAnim }}>
            <View style={styles.snackBar_iconContainer}>
                <OctIcon name="check-circle-fill" size={25} color="#2db551" />
                {/* <FaIcon name="exclamation-circle" size={30} color="red" /> */}
            </View>
            <View style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "center", width: 200 }}>
                <Text style={{ ...styles.snackBar_text, color: "#2db551", fontSize: 18 }}>Success</Text>
                <Text style={{ ...styles.snackBar_text, color: AppColors.textDark }}>{props.info.message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    snackBar: {
        backgroundColor: AppColors.secondaryDark,
        position: "absolute",
        bottom: -10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "center",
        width: 350,
        height: 75,
        borderRadius: 10,
    },

    snackBar_iconContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        width: 35,
        height: 35,
        marginHorizontal: 20,
    },

    snackBar_text: {
        fontSize: 16.5,
        fontWeight: 600,
    }
});

export default CustomSnackBar;