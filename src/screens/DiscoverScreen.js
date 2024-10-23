import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Modal from "../components/Modal";
import Map from "../components/Map";
import SearchBar from '../components/searchBar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function DiscoverScreen({navigation}) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={localStyles.container}>
                    <Map/>
                    
                    <View style={localStyles.searchBarContainer}>
                        <SearchBar navigation={navigation}/>
                    </View>

                    <Modal />
                </View>
            </BottomSheetModalProvider>
        </KeyboardAvoidingView>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
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