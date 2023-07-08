/* eslint-disable*/
import React from 'react';

import AppColors from '../../utils/AppColors';
import moment from 'moment';
import TaskList from './TaskList';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const PopUpTaskMenu = (props) => {
  const createdDate = moment(new Date()).format("dddd, Do MMM YYYY, h:mm a");

  const imgURI = "https://nationaltoday.com/wp-content/uploads/2021/12/Anime-Day-1200x834.jpg";

  const NoteSelectHandler = () => {
    props.onSelect(props.index);
  }

  const EditNoteHandler = () => {
    console.log("Edit Note");
  }

  const CopyNoteHandler = () => {
    console.log("Copy Note");
  }

  const ShareNoteHandler = () => {
    console.log("Share Note");
  }

  const DeleteNoteHandler = () => {
    console.log("Delete Note");
  }

  return (
    <Menu>
      <MenuTrigger triggerOnLongPress
        onAlternativeAction={NoteSelectHandler}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerWrapper: styles.noteCard,
        }}>
         {
          <Task taskItems = {props.taskItems} setTaskItems = {props.setTaskItems}></Task>
        }
      </MenuTrigger>
      <MenuOptions style={styles.noteCard_popupMenu}>
        <Text style={styles.popupMenu_title}>{props.name}</Text>
        <MenuOption customStyles={styles.popupMenu_options} onSelect={EditNoteHandler} value={1} text="Edit Item" />
        <MenuOption customStyles={styles.popupMenu_options} onSelect={CopyNoteHandler} value={2} text="Web Search" />
        <MenuOption customStyles={styles.popupMenu_options} onSelect={ShareNoteHandler} value={3} text="Copy To Clipboard" />
        <MenuOption customStyles={styles.popupMenu_options} onSelect={DeleteNoteHandler} value={4} text="Delete Note" />
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
    aspectRatio: 3 / 2,
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

export default PopUpTaskMenu;
