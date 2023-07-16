/* eslint-disable*/
import { React, useEffect,useState } from 'react';

import AppColors from '../../utils/AppColors';
import moment from 'moment';
import Task from '../tasks/Task';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const NoteCard = (props) => {
  let note = {
    title: props.note.title,
    subTitle: props.note.subTitle,
    colorTag: props.note.colorTag,
    lastUpdated: moment(props.note.lastUpdated).format("dddd, Do MMM YYYY, h:mm a"),
    image: props.note.image,
    tasks: props.note.tasks,
  }
  const [taskItems, setTaskItems] = useState(note.tasks);

  const completeTask = async (index) => {
    let itemsCopy = [...note.tasks];
    itemsCopy[index].isFinished = !itemsCopy[index].isFinished;
    note.tasks = itemsCopy;
    setTaskItems(itemsCopy);
    console.log('note.tasks before change:' + JSON.stringify(note.tasks));
    //await SaveNoteHandler(itemsCopy);

  }

  const SaveNoteHandler = async () => {
    await AppController.SaveNote({
      note: note,
      onSuccess: () => {
        appContext.callSnackBar({
          type: "congrats",
          message: "Save note successfully!"
        });
        props.navigation.goBack();
      },
      onFailed: (response) => {
        console.log(response);
      }
    })
  }

  const NoteSelectHandler = () => props.onSelect(props.index);
  const EditNoteHandler = () => console.log("Edit Note");
  const CopyNoteHandler = () => console.log("Copy Note");
  const ShareNoteHandler = () => console.log("Share Note");
  const DeleteNoteHandler = () => props.onDelete(props.index);

  useEffect(() => {
  
    setTaskItems(note.tasks);

  }, [note.tasks]);

  return (
    <Menu>
      <MenuTrigger triggerOnLongPress
        onAlternativeAction={NoteSelectHandler}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerWrapper: { ...styles.noteCard, backgroundColor: note.colorTag }
        }}>
        {note.image != null &&
          <Image
            style={{
              ...styles.noteCard__image,
              aspectRatio: note.image.width / note.image.height,
            }}
            source={{ uri: note.image.uri }}
            resizeMode="stretch" />}
        <View style={styles.noteCard__content}>
          <Text style={styles.noteCard_title}>{note.title}</Text>
          <Text style={styles.noteCard_subTitle} numberOfLines={5}>{note.subTitle}</Text>
          <Text style={styles.noteCard_lastUpdated}>{note.lastUpdated}  </Text>
        </View>

        {
          note.tasks != null && taskItems != null &&
          taskItems.map((item, index) => {
            
            return (
              <View>
                {
                  <TouchableOpacity onPress={() => completeTask(index)}>
                    <Task isFinished={item.isFinished} text={item.toDo} />
                  </TouchableOpacity>
                }
              </View>

            )
          })

        }
      </MenuTrigger>
      <MenuOptions style={styles.noteCard_popupMenu}>
        <Text style={styles.popupMenu_title}>Note Title {props.id}</Text>
        <MenuOption customStyles={styles.popupMenu_options} onSelect={EditNoteHandler} value={1} text="Edit Note" />
        <MenuOption customStyles={styles.popupMenu_options} onSelect={CopyNoteHandler} value={1} text="Copy Note" />
        <MenuOption customStyles={styles.popupMenu_options} onSelect={ShareNoteHandler} value={2} text="Share Note" />
        <MenuOption customStyles={styles.popupMenu_options} onSelect={DeleteNoteHandler} value={3} text="Delete Note" />
      </MenuOptions>
    </Menu >
  );
};

const styles = StyleSheet.create({
  noteCard: {
    flexDirection: "column",
    backgroundColor: AppColors.secondaryDark,
    color: AppColors.textDark,
    width: "100%",
    height: "auto",
    marginBottom: "5%",
    borderRadius: 10,
  },

  noteCard__image: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  noteCard__content: {
    flexDirection: "column",
    padding: 10,
  },

  noteCard_title: {
    color: AppColors.textDark,
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
  },

  noteCard_subTitle: {
    color: AppColors.textDark,
    flexWrap: "wrap",
    marginBottom: 10,
  },

  noteCard_lastUpdated: {
    color: AppColors.textDark,
    fontSize: 10,
  },

  noteCard_popupMenu: {
    backgroundColor: AppColors.secondaryDark,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    height: 190,
  },

  popupMenu_title: {
    color: "#fcba03",
    padding: 10,
  },

  popupMenu_options: {
    optionWrapper: {
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 0,
    },
    optionText: {
      color: AppColors.textDark,
      paddingHorizontal: 10,
    },
  },
});

export default NoteCard;
