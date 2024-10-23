import React, { useState, useRef } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Modal from "../components/Modal";
import Map from "../components/Map";
import SearchBar from '../components/searchBar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function DiscoverScreen({navigation}) {
    const bottomSheetRef = useRef(null);

    const handleMapTouch = () => {
        // Hide the keyboard 
        if(Keyboard.isVisible) {
            Keyboard.dismiss();
        }

        // Snap the bottom sheet to the top
        if (bottomSheetRef.current) {
            bottomSheetRef.current(0); 
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={localStyles.container}>
                    <Map onTouch={handleMapTouch} />
                    
                    <View style={localStyles.searchBarContainer}>
                        <SearchBar navigation={navigation}/>
                    </View>

                    <Modal initialSnapIndex={1} snapToOnAction={(snap) => bottomSheetRef.current = snap} />
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