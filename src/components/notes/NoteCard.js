/* eslint-disable*/
import { View, Text, StyleSheet } from 'react-native';
import AppColors from '../../utils/AppColors';

const NoteCard = (props) => {
  return (
    <View style={styles.noteCard}>
      <Text style={{ color: "white" }}>NoteCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noteCard: {
    flex: 1,
    backgroundColor: AppColors.secondaryDark,
    color: AppColors.textDark,
    margin: 10,
    borderRadius: 10,
  }
});

export default NoteCard;
