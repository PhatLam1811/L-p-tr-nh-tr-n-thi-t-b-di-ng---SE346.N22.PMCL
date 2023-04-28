import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainScreen: {
        backgroundColor: "#1c1c1c",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },

    mainScreen__header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "5%",
        marginHorizontal: "3%",
    },

    mainScreen__title: {
        color: "white",
        fontSize: 25,
        fontWeight: 700,
    },

    mainScreen__toolbar: {
        backgroundColor: "#262626",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "10%",
        paddingHorizontal: "3%",
    },

    mainScreen__checklistShortcut: {
        backgroundColor: "transparent",
        size: 25,
        marginHorizontal: "3%"
    },

    mainScreen__newNoteFAB: {
        color: "#fcba03",
        variant: "standard",
        size: "default",
        marginLeft: "auto",
        marginRight: "5%",
        marginTop: "-7%",
        marginBottom: "auto"
    }
});

export default styles;