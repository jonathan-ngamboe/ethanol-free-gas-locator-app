import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function DividerText({ text, style, textColor, backgroundColor }) {
    return (
        <View style={[style, {flexDirection: 'row', alignItems: 'center', marginVertical: 20}]}>
            <View style={{flex: 1, height: 1, backgroundColor: backgroundColor ? backgroundColor : '#ddd'}} />
            <View>
                <Text style={{width: 50, textAlign: 'center', color: textColor ? textColor : '#ddd'}}>{text}</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: backgroundColor ? backgroundColor : '#ddd'}} />
        </View>
    )
}