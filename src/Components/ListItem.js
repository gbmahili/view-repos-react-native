import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function ListItem(props) {
    return (
        <View style={{
            display: 'flex',
            padding: 7,
            backgroundColor: "#FAFAFA",
            borderBottomColor: "#DEDEDE",
            borderBottomWidth: 1,
            margin: 5

        }}>
            <TouchableOpacity onPress={props.openLink}>
                <Text key={props.keyIndex}>
                    {props.itemName}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

