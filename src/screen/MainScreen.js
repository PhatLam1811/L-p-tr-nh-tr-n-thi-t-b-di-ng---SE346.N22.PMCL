import React, { useState, useEffect, useContext } from 'react';

import OctIcon from 'react-native-vector-icons/Octicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../components/tools/SearchBar';
import NoteList from '../components/notes/NoteList';
import AppController from '../controllers/AppController';
import AppContext from '../utils/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';

import { useIsFocused } from '@react-navigation/native';
import { FAB } from '@react-native-material/core';
import { StyleSheet, Switch, Text, View, Share } from 'react-native';
import { GetNoteAction } from '../actions/GetNote';
import { DarkTheme } from '../utils/AppColors';

const MainScreen = (props) => {
    const isFocus = useIsFocused();
    const appContext = useContext(AppContext);

    const [notes, setNotes] = useState([]);

    const SearchNoteHandler = (input) => {
        AppController.GetAllNotes({
            filter: input,
            onSuccess: (data) => setNotes(data),
            onFailed: (error) => console.log(error),
        })
    };

    const CreateNoteHandler = (type) => {
        const payload = { isCreateNote: true, type: type };
        props.navigation.navigate("Detail", payload);
    };

    const SelectNoteHandler = (ID) => {
        const payload = { isCreateNote: false, ID: ID };
        props.navigation.navigate('Detail', payload);
    }

    const LoadNotesHandler = async () => AppController.GetAllNotes({
        onSuccess: (data) => setNotes(data),
        onFailed: (error) => console.log(error),
    });

    const DeleteNoteHandler = (ID) => {
        AppController.DeleteNote({
            ID: ID,
            onSuccess: () => {
                appContext.callSnackBar({
                    type: "congrats",
                    message: "Delete note successfully!"
                });
                LoadNotesHandler();
            },
            onFailed: (error) => console.log(error)
        });
    }

    const ShareNoteHandler = async (ID) => {
        try {
            const response = await GetNoteAction(ID);
            const note = response.data;

            let shareContent = '#' + note.title;
            shareContent += note.subTitle != null ? '\n' + note.subTitle : "";
            shareContent += note.content != null ? '\n' + note.content : "";
            shareContent += note.url != null ? '\n' + note.url : "";

            //nội dung Share để ở trong message, chỉ để ở dạng string
            const result = await Share.share({
                message: shareContent,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error);
        }
    };

    const CopyNoteHandler = async (ID) => {
        try {
            const response = await GetNoteAction(ID);
            const note = response.data;

            let copyContent = '#' + note.title;
            copyContent += note.subTitle != null ? '\n' + note.subTitle : "";
            copyContent += note.content != null ? '\n' + note.content : "";
            copyContent += note.url != null ? '\n' + note.url : "";

            Clipboard.setString(copyContent);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isFocus) {
            LoadNotesHandler();
        }
    }, [isFocus]);

    const styles = StyleSheet.create({
        mainScreen: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: appContext.appTheme?.primary,
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
            backgroundColor: appContext.appTheme?.secondary,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: '3%',
        },

        mainScreen__title: {
            backgroundColor: 'transparent',
            color: appContext.appTheme?.text,
            fontSize: 25,
            fontWeight: 700,
            marginLeft: '5%',
        },

        mainScreen__icon: {
            backgroundColor: 'transparent',
            color: appContext.appTheme?.icon,
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

    return (
        <View style={styles.mainScreen}>
            <View style={styles.mainScreen__header}>
                <Text style={styles.mainScreen__title}>My Notes</Text>
                <Switch value={appContext.appTheme === DarkTheme} onValueChange={appContext.changeAppTheme} />
            </View>
            <View style={styles.mainScreen__contentContainer}>
                <SearchBar
                    layout={appContext.appLayout}
                    onSearch={SearchNoteHandler}
                    onChangeLayout={appContext.changeAppLayout} />
                <NoteList
                    list={notes}
                    layout={appContext.appLayout}
                    onSelectNote={SelectNoteHandler}
                    onDeleteNote={DeleteNoteHandler}
                    onCopyNote={CopyNoteHandler}
                    onShareNote={ShareNoteHandler}
                />
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

export default MainScreen;
