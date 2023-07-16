import React from "react";

import Fa5Icon from "react-native-vector-icons/FontAwesome5";
import AppColors from "../../utils/AppColors";

import { View, Pressable, StyleSheet } from "react-native";

const ColorItem = (props) => {
    return (
        <Pressable style={{ marginEnd: 20 }} onPress={() => props.onSelect(props.color)}>
            <View style={{ ...styles.colorItem, width: 40, height: 40, backgroundColor: props.color }}>
                <View style={{ ...styles.colorItem, width: 35, height: 35, backgroundColor: AppColors.primaryDark }}>
                    <View style={{ ...styles.colorItem, width: 20, height: 20, backgroundColor: props.color }}>
                        {props.isSelected && <Fa5Icon name="check" size={15} color="black" />}
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    colorItem: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    }
})

export default ColorItem;