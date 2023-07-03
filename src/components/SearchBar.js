import React, { useEffect, useState } from "react";

import { StyleSheet, TextInput, View } from "react-native";

import OctIcon from "react-native-vector-icons/Octicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import FeaIcon from "react-native-vector-icons/Feather";
import AppColors from "../utils/AppColors";

const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("");

    const InputTextChangeHandler = (value) => {
        setSearchInput(value);
    }

    useEffect(() => {
        const onSearch = setTimeout(_ => props.onSearch(searchInput), 500);
        return () => clearTimeout(onSearch);
    }, [searchInput]);

    return (
        <View style={{ ...styles.searchBar, ...props.style }}>
            <View style={styles.searchBar__iconContainer}>
                <MatIcon name="search" {...styles.searchBar__icon} />
            </View>
            <View style={styles.searchBar__textInputContainer}>
                <TextInput
                    style={styles.searchBar__textInput}
                    autoFocus={false}
                    placeholder="Search notes"
                    placeholderTextColor={AppColors.iconDark}
                    value={searchInput}
                    onChangeText={InputTextChangeHandler} />
            </View>
            <View style={styles.searchBar__iconContainer} >
                {props.layout === "grid" && <FeaIcon
                    name="layout"
                    {...styles.searchBar__icon}
                    onPress={props.onChangeLayout} />}
                {props.layout === "column" && <OctIcon
                    name="rows"
                    {...styles.searchBar__icon}
                    onPress={props.onChangeLayout} />}
            </View>
        </View>
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: AppColors.secondaryDark,
        color: AppColors.textDark,
        flexDirection: "row",
        width: "95%",
        height: 50,
        marginBottom: "5%",
        marginHorizontal: "2.5%",
        borderRadius: 10,
    },

    searchBar__iconContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    searchBar__icon: {
        color: AppColors.textDark,
        size: 30,
    },

    searchBar__textInputContainer: {
        flex: 7,
        alignSelf: "center",
        height: "100%",
    },

    searchBar__textInput: {
        flex: 1,
        color: AppColors.textDark,
        fontSize: 18,
        padding: 0,
    },
});