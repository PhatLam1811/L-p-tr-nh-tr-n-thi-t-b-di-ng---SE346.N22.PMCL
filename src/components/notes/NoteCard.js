/* eslint-disable*/
import React from 'react';

import AppColors from '../../utils/AppColors';
import moment from 'moment';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NoteCard = (props) => {
  const note = props.item;
  const createdDate = moment(new Date()).format("dddd, Do MMM YYYY, h:mm a");

  const imgURI = "https://www.charlieintel.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.charlieintel.com/wp-content/uploads/2023/05/Best-Himeko-Honkai-Star-Rail-build-Light-Cone-Relics-Planar-Ornament-more.jpg";

  return (
    <TouchableOpacity style={styles.noteCard} onPress={() => props.onSelect(props.index)}>
      <Image style={styles.noteCard__image} source={{ uri: imgURI }} resizeMode="stretch" />
      <View style={styles.noteCard__content}>
        <Text style={styles.noteCard_title}>{`Note Title ${props.id}`}</Text>
        <Text style={styles.noteCard_subTitle} numberOfLines={5}>Note SubTitle</Text>
        <Text style={styles.noteCard_lastUpdated}>{createdDate}</Text>
      </View>
    </TouchableOpacity>
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
});

export default NoteCard;
