import React, { useEffect, useState } from "react";

import AppColors, { colorTags } from "../../utils/AppColors";

import ColorItem from "./ColorItem";

import { View, Text, ScrollView } from "react-native";

const ColorPicker = (props) => {
    const [tags, setTags] = useState([]);

    const LoadColorTags = (onSelectTag) => {
        let tagItems = [];

        let onSelectIdex = colorTags.indexOf(onSelectTag);
        if (onSelectIdex === -1) onSelectIdex = 0;

        colorTags.map((tag, index) => {
            tagItems.push(
                <ColorItem
                    key={index}
                    color={tag}
                    isSelected={index === onSelectIdex}
                    onSelect={SelectColorTagHandler} />
            )
        })

        setTags(tagItems);
    }

    const SelectColorTagHandler = (tag) => {
        LoadColorTags(tag);
        props.onTagChange(tag);
    }

    useEffect(() => {
        LoadColorTags(props.onSelectTag);
    }, [props.onSelectTag])

    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: 50,
            paddingHorizontal: 20
        }}>
            <ScrollView horizontal>
                {tags.map((tag) => tag)}
            </ScrollView>
            <Text style={{
                color: AppColors.textDark,
                fontSize: 17,
                fontWeight: 500,
                marginStart: 5,
            }}>
                Pick Color
            </Text>
        </View>
    )
}

export default ColorPicker;