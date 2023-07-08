import React from 'react';
import {View, Text, StyleSheet, TouchableOpacityComponent} from 'react-native'
import AppColors from '../../utils/AppColors';
import Icon from "react-native-vector-icons/Octicons";

const getFullName = (isFinished, text) => {
    if(isFinished === false){
        return (
            <View style={styles.itemLeft}>

                <View style={styles.square}></View>
                <Text style={styles.itemText}>{text} </Text>
            </View>
        )

    }
    else{
        return (
        <View style={styles.itemLeft}>

            <View style={styles.square}>
                <Icon name="check" size={24} style={{}}/>
            </View>
            <Text style={styles.itemTextButCompleted}>{text} </Text>
        </View>
        )
    }
  };

const Task = (props) => {
    return (
        <View style={styles.item}>
                {
                    getFullName(props.isFinished, props.text)

                }
            
            <View style={styles.circular}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor: AppColors.primaryDark,
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'95%',
        margin:10,
    },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap'
    } ,
    square: {
        width:24,
        height:24,
        backgroundColor: '#55BCF6',
        opacity:0.8,
        borderRadius:5,
        marginRight:15,
       alignItems:"center"
        
    },
    
    itemText:{
        maxWidth:'80%',
        color:'#fff'
    },
    itemTextButCompleted:{
        maxWidth:'80%',
        color:'#fff',
        textDecorationLine:"line-through",
        textDecorationStyle: 'solid'
    },
    circular:{
        width:12,
        height:12,
        borderColor:'#55BCF6',
        borderWidth:2,
        borderRadius:5,
    }
})

export default Task;