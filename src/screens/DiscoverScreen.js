import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useGlobalStyles } from '../styles/globalStyles';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { DEFAULT_REGION, ZOOM_LEVELS } from '../constants/mapConstants';
import CardSearchList from '../components/CardSearchList';

export default function DiscoverScreen() {
    const styles = useGlobalStyles();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <View style={localStyles.container}>
                <MapView
                    style={localStyles.map}
                    initialRegion={DEFAULT_REGION}
                    zoomEnabled={true}
                    zoomTapEnabled={true}
                    zoomControlEnabled={true}
                    zoomLevel={ZOOM_LEVELS.CITY}
                />
                <View style={localStyles.overlay}>
                    <CardSearchList />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

    map: {
        width: '100%',
        height: '100%',
    },

    overlay: {
        position: 'absolute',
        bottom: 15, 
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },


});