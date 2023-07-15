import React, { useState, useEffect } from 'react';

import OctIcon from 'react-native-vector-icons/Octicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/notes/NoteList';
import AppColors from '../utils/AppColors';
import AppController from '../controllers/AppController';

import { useIsFocused } from '@react-navigation/native';
import { FAB } from '@react-native-material/core';
import { StyleSheet, Switch, Text, View } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';

const exampleImage = require('./s.jpg');

const MainScreen = (props) => {
    const isFocus = useIsFocused();

    const [imageSource, setImageSource] = useState('');
    const [notes, setNotes] = useState([]);
    const [isGridLayout, SetIsGridLayout] = useState(true);

    const ChangeNotesLayoutHandler = () => {
        console.log('change notes layout (column to grids & vice versa)');
        SetIsGridLayout(prev => !prev);
        // change notes display style
    };

    const LoadNotesHandler = async () => AppController.GetAllNotes({
        onSuccess: (data) => setNotes(data),
        onFailed: (error) => console.log(error),
    });

    const SearchNoteHandler = (input) => {
        console.log('on search: ' + input);
    };

    const CreateNoteHandler = (type) => {
        const payload = { isCreateNote: true, type: type };
        props.navigation.navigate("Detail", payload);
    };

    const SelectNoteHandler = (ID) => {
        const payload = { isCreateNote: false, ID: ID };
        props.navigation.navigate('Detail', payload);
    }

    const DeleteNoteHandler = (ID) => {
        AppController.DeleteNote({
            ID: ID,
            onSuccess: () => LoadNotesHandler(),
            onFailed: (error) => console.log(error)
        });
    }

    useEffect(() => {
        if (isFocus) {
            LoadNotesHandler();
        }
    }, [isFocus]);

    return (
        <View style={styles.mainScreen}>
            <View style={styles.mainScreen__header}>
                <Text style={styles.mainScreen__title}>My Notes</Text>
                <Switch />
            </View>
            <View style={styles.mainScreen__contentContainer}>
                <SearchBar
                    layout={isGridLayout ? 'grid' : 'column'}
                    onSearch={SearchNoteHandler}
                    onChangeLayout={ChangeNotesLayoutHandler} />
                <NoteList
                    list={notes}
                    layout={isGridLayout ? 'grid' : 'column'}
                    onSelectNote={SelectNoteHandler}
                    onDeleteNote={DeleteNoteHandler} />
            </View>
            <View style={styles.mainScreen__toolbar}>
                <OctIcon
                    name="checklist"
                    {...styles.mainScreen__icon}
                    onPress={() => CreateNoteHandler("task")}
                />
                <MatIcon
                    name="image"
                    {...styles.mainScreen__icon}
                    size={30}
                    onPress={() => CreateNoteHandler("image")}
                />
                <OctIcon
                    name="globe"
                    {...styles.mainScreen__icon}
                    onPress={() => CreateNoteHandler("url")}
                />
                <FAB
                    {...styles.mainScreen__newNoteFAB}
                    icon={<OctIcon name="plus" {...styles.mainScreen__icon} />}
                    onPress={() => CreateNoteHandler()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: AppColors.primaryDark,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    mainScreen__header: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'inherit',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    mainScreen__contentContainer: {
        flex: 8,
        flexDirection: 'column',
        backgroundColor: 'inherit',
    },

    mainScreen__toolbar: {
        flex: 1,
        backgroundColor: AppColors.secondaryDark,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '3%',
    },

    mainScreen__title: {
        backgroundColor: 'transparent',
        color: AppColors.textDark,
        fontSize: 25,
        fontWeight: 700,
        marginLeft: '5%',
    },

    mainScreen__icon: {
        backgroundColor: 'transparent',
        color: AppColors.iconDark,
        size: 25,
        marginHorizontal: '3%',
    },

    mainScreen__newNoteFAB: {
        backgroundColor: 'transparent',
        color: '#fcba03',
        variant: 'standard',
        size: 'default',
        marginLeft: 'auto',
        marginRight: '5%',
        marginTop: '-7%',
        marginBottom: 'auto',
    },
});

export default MainScreen;
