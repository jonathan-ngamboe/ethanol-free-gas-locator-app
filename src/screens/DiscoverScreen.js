import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import CardSearchList from '../components/CardSearchList';
import Map from "../components/Map";
import SearchBar from '../components/searchBar';

export default function DiscoverScreen({navigation}) {

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <View style={localStyles.container}>
                <Map/>

                <View style={localStyles.searchBarContainer}>
                    <SearchBar navigation={navigation}/>
                </View>
                
                <View style={localStyles.overlay}>
                    <CardSearchList navigation={navigation}/>
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

    overlay: {
        position: 'absolute',
        bottom: 15, 
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    searchBarContainer: {
        position: 'absolute',
        top: 50,  
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1, 
    },
});