import React, { useEffect, useState } from "react";

import { StyleSheet, TextInput, View } from "react-native";

import Icon1 from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Feather";

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const onSearch = setTimeout(() => {
            console.log("filter by search");
        }, 500);

        return () => {
            clearTimeout(onSearch);
        }
    }, [searchValue]);

    const InputTextChangeHandler = (value) => {
        setSearchValue(value);
    }

    return (
        <View style={{ ...styles.searchBar, ...props.style }}>
            <View style={styles.searchBar__iconContainer}>
                <Icon1 name="search" size={30} />
            </View>
            <View style={styles.searchBar__textInputContainer}>
                <TextInput
                    style={styles.searchBar__textInput}
                    autoFocus={false}
                    placeholder="Search notes"
                    value={searchValue}
                    onChangeText={InputTextChangeHandler} />
            </View>
            <View style={styles.searchBar__iconContainer} >
                <Icon2 name="layout" size={30} onPress={props.onChangeLayout} />
            </View>
        </View>
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: "#363636",
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
    },

    searchBar__iconContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },

    searchBar__textInputContainer: {
        flex: 7,
        alignSelf: "center",
        height: "100%",
    },

    searchBar__textInput: {
        flex: 1,
        fontSize: 18,
        padding: 0,
    },
});