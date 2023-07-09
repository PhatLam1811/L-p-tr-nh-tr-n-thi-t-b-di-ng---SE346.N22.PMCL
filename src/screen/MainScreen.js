import React, { useState, useEffect } from 'react';

import OctIcon from 'react-native-vector-icons/Octicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/notes/NoteList';
import AppColors from '../utils/AppColors';
import Utils from '../utils/Utils';

import { FAB } from '@react-native-material/core';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';
import { GetAllNoteAction, GetNoteAction } from './../actions/GetNote';
import { DeleteAllNoteAction } from '../actions/DeleteNote';
// import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const exampleImage = require('./s.jpg');

const MainScreen = props => {
    const [imageSource, setImageSource] = useState('');
    const [notes, setNotes] = useState([]);
    const [isGridLayout, SetIsGridLayout] = useState(true);

    const ChangeNotesLayoutHandler = () => {
        console.log('change notes layout (column to grids & vice versa)');
        SetIsGridLayout(prev => !prev);
        // change notes display style
    };

    const CreateChecklistNoteHandler = () => {
        console.log('checklist pressed!');
        // display create checklist note screen
    };

    const CreateImageNoteHandler = async () => {
        console.log('image note pressed!');
        // display create image note screen
    };

    const TestImagePicker = async () => {
        // try{
        // // const doc=await DocumentPicker.pick({
        // //     type:[DocumentPicker.types.images],
        // //     allowMultiSelection:false,
        // // });

        // const doc=await DocumentPicker.pickSingle({
        //     type:[DocumentPicker.types.images],
        // });

        // console.log(doc)
        // }
        // catch(err){
        //     console.log(err);
        //     if(DocumentPicker.isCancel(e)){
        //         console.log(e);
        //     }
        // }

        try {
            console.log('require h.jpg is:');
            console.log(require('./s.jpg'));
            console.log('example image is:');
            console.log(exampleImage);
            console.log('image source:');
            console.log(imageSource);
            console.log('----------------------');
            launchImageLibrary(
                {
                    storagOptions: {
                        path: 'image',
                    },
                },
                response => {
                    console.log("response.assets[0]");
                    console.log(response.assets[0]);
                    console.log('response.assets[0].uri');

                    console.log(response.assets[0].uri);
                    setImageSource(response.assets[0].uri)
                },
            );
        } catch (err) {
            console.log(err);
        }
    }

    const SearchNoteHandler = input => {
        console.log('on search: ' + input);
    };

    const CreateURLNoteHandler = () => {
        console.log('URL note pressed!');
        // display create URL note screen
    };



    const NoteScreenNavigateHandler = (ID) => {
        props.navigation.navigate('Detail', {
            ID: ID,
            // onGoBack: () => LoadNoteDataHandler(),
        });
    }

    const CreateNoteHandler = () => {
        NoteScreenNavigateHandler();
    };

    const LoadNoteDataHandler = async () => {
        try {
            const response = await GetAllNoteAction();

            if (response.result === 'success') {
                setNotes(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { LoadNoteDataHandler(); }, []);

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
                    screenNavigation={NoteScreenNavigateHandler} />
            </View>
            <View style={styles.mainScreen__toolbar}>
                <OctIcon
                    name="checklist"
                    {...styles.mainScreen__icon}
                    // onPress={CreateChecklistNoteHandler}
                    onPress={async () => await Utils.GenerateSampleNotes(7)}
                />
                <MatIcon
                    name="image"
                    {...styles.mainScreen__icon}
                    size={30}
                    // onPress={CreateImageNoteHandler}
                    onPress={async () => await Utils.ClearData()}
                />
                <OctIcon
                    name="globe"
                    {...styles.mainScreen__icon}
                    onPress={CreateURLNoteHandler}
                />
                <FAB
                    {...styles.mainScreen__newNoteFAB}
                    icon={<OctIcon name="plus" {...styles.mainScreen__icon} />}
                    onPress={CreateNoteHandler}
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
