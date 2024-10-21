import React from "react";
import MapView, { Marker } from "react-native-maps";
import { Card, Searchbar } from 'react-native-paper';
import { useGlobalStyles } from '../styles/globalStyles';
import { View, StyleSheet, Text, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { DEFAULT_REGION, ZOOM_LEVELS } from '../constants/mapConstants';

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
                    <Card style={{...localStyles.card, ...styles.cardBackgroundColor}}>
                        <Searchbar
                            placeholder="Search near ethanol stations"
                            inputStyle={localStyles.searchInput}
                            style={{...localStyles.searchBar, ...styles.searchBar}}
                            //onChangeText={setSearchQuery}
                            //value={searchQuery}
                        />
                        <Card.Content style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <Text style={styles.textColor}>Results will be displayed here</Text>
                        </Card.Content>     
                    </Card>
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

    card: {
        borderRadius: 20,
        width: '100%',
        elevation: 4, // For Android  
        shadowColor: '#000', // For iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        padding: 20,
    },

    searchBar: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        height: 36, 
        justifyContent: 'center',
        paddingHorizontal: 8,
    },

    searchInput: {
        fontSize: 14,
        minHeight: 0, 
        paddingBottom: 0, 
        textAlignVertical: 'center', 
    },
});