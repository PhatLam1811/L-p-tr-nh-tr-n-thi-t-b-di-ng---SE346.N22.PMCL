import React from "react";

import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { StyleSheet, Text, View } from "react-native";

const HyperLink = (props) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <Text style={styles.hyperLink}>{props.link}</Text>
            <MatComIcon style={{ marginEnd: 25 }}
                name="trash-can"
                color="red"
                size={30}
                onPress={() => props.onLinkDelete()} />
        </View>
    );
}

const styles = StyleSheet.create({
    hyperLink: {
        color: "#fcba03",
        width: "80%",
        fontSize: 18,
        textAlign: "justify",
        textDecorationLine: "underline",
        marginHorizontal: 3,
    },
})

export default HyperLink;