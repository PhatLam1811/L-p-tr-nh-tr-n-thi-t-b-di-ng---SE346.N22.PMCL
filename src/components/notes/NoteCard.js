/* eslint-disable*/
import React from 'react';

import AppColors from '../../utils/AppColors';
import moment from 'moment';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const NoteCard = (props) => {
  const createdDate = moment(new Date()).format("dddd, Do MMM YYYY, h:mm a");

  const imgURI = "https://www.charlieintel.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.charlieintel.com/wp-content/uploads/2023/05/Best-Himeko-Honkai-Star-Rail-build-Light-Cone-Relics-Planar-Ornament-more.jpg";

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
        onAlternativeAction={() => console.log("press")}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerWrapper: styles.noteCard,
        }}>
        <Image style={styles.noteCard__image} source={{ uri: imgURI }} resizeMode="stretch" />
        <View style={styles.noteCard__content}>
          <Text style={styles.noteCard_title}>{`Note Title ${props.id}`}</Text>
          <Text style={styles.noteCard_subTitle} numberOfLines={5}>Note SubTitle</Text>
          <Text style={styles.noteCard_lastUpdated}>{createdDate}</Text>
        </View>
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
    minHeight: 100,
    maxHeight: 200,
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
