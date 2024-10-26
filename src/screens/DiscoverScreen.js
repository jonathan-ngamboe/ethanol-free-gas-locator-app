import React, { useRef } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Modal from "../components/Modal";
import Map from "../components/Map";
import SearchBar from '../components/SearchBar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import StationCarousel from "../components/StationCarousel";
import { Avatar, useTheme } from 'react-native-paper';
import { useRoute, useFocusEffect } from '@react-navigation/native';  
import StationList from "../components/StationList";


export default function DiscoverScreen({navigation}) {
    const route = useRoute();
    const params = route.params;
    const theme = useTheme();

    // Used to choose between the carousel and the list
    const viewMode = useRef('carousel');

    // Reference to the bottom sheet modal
    const bottomSheetRef = useRef(null);

    // Reference to the search bar. Handle the transition from the HomeScreen to the DiscoverScreen
    const searchBarRef = useRef(null);  

    // Get the search query from the route params
    const {openKeyboard = false} = params || {};

    // Force focus on the search bar when the the last screen was the HomeScreen
    useFocusEffect(
        React.useCallback(() => {
            if (searchBarRef.current && openKeyboard) {
                searchBarRef.current.focus();  // Give focus to the search bar to display the keyboard
                
                // Hide the modal
                setTimeout(() => {
                    closeModal();
                }, 2000); 

                // Reset the openKeyboard parameter to avoid opening the keyboard again
                navigation.setParams({
                    ...params,
                    openKeyboard: false
                });
            }
        }, [openKeyboard])
    );

    // Function to close the modal
    const closeModal = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current(0);
        }
    }
    // Function to open the modal
    const openModal = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current(1);
        }
    }

    // Function to handle the touch event on the map
    const handleMapTouch = () => {
        // Hide the keyboard 
        Keyboard.dismiss();
        // Close the modal
        closeModal();
    };

    const renderStationCarousel = () => {
        return (
            <StationCarousel 
                stationList={stationList} 
                navigation={navigation} 
                showHeader={true}
                containerStyle={localStyles.carouselContainer} 
                cardContainerStyle={localStyles.carouselCardContainer}
                headerStyle={[localStyles.carouselHeader, {backgroundColor: theme.colors.background}]}
            />
        );
    };

    const renderStationList = () => {
        return (
            <StationList stationList={stationList} navigation={navigation} />
        );
    };

    // Example of a complete E85 station object with relevant properties
    const exampleE85Station = {
        // Essential station identification
        id: 1519,
        station_name: "Springfield E85 Station",
        fuel_type_code: "E85",  // Important pour identifier le type de carburant
        
        // Location information
        street_address: "1394 S Sepulveda Blvd",
        city: "Los Angeles",
        state: "CA",
        zip: "90024",
        
        // Station status and accessibility
        status_code: "T",      // E = Available, P = Planned, T = Temporarily Unavailable
        access_code: "public", // public ou private
        access_days_time: "24 hours daily",
        
        // E85 specific information
        e85_blender_pump: true,  // Indique si la station a une pompe de mélange
        e85_other_ethanol_blends: ["E15", "E20-E25"], // Autres mélanges disponibles
        
        // Payment information
        cards_accepted: "CREDIT DEBIT CASH V M D A", // Types de paiement acceptés
        
        // Additional useful information
        ev_network_web: "http://www.example.com", // Site web de la station
        station_phone: "310-555-0123",
        access_days_time: "24 hours daily",
        facility_type: "GAS_STATION", // Type d'établissement
        
        // Optionnel : informations de navigation
        latitude: 34.0453,
        longitude: -118.4441,
        intersection_directions: "Corner of Sepulveda and Santa Monica Blvd", // Aide à la localisation

        // Distance from the user's location
        distance: 0.5, // Distance en miles
    };
    
    // Example of a minimal E85 station object
    const minimalE85Station = {
        id: 1520,
        fuel_type_code: "E85",
        station_name: "Quick E85",
        street_address: "123 Main St",
        city: "Springfield",
        state: "IL",
        status_code: "T",
        access_code: "public",
        latitude: 34.0453,
        longitude: -118.4441,
    };

    const stationList = [
        exampleE85Station,
        minimalE85Station,
    ];

    const filterIcon = (
        <Avatar.Icon
            icon='tune'
            size={45}
            style={{backgroundColor: theme.colors.background}}
            color={theme.colors.onBackground}
        />
    )

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={localStyles.container}>
                    <Map onTouch={handleMapTouch} />
                    
                    <View style={localStyles.searchBarContainer}>
                        <SearchBar
                            barRef={searchBarRef}
                            leftIcon='map-marker'
                            onLeftIconPress={() => console.log('Map icon pressed')}
                            rightComponent={filterIcon}
                            onRightComponentPress={() => console.log('Filter icon pressed')}
                        />
                    </View>

                    <Modal 
                        initialSnapIndex={1} 
                        snapToOnAction={(snap) => bottomSheetRef.current = snap} 
                        stationList={stationList}
                        renderItem={() => viewMode.current === 'carousel' ? renderStationCarousel() : renderStationList()}
                        backgroundColor={ viewMode.current === 'carousel' ? 'transparent' : theme.colors.background }
                    />
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

    carouselContainer: {
        backgroundColor: 'transparent',
        marginBottom: 60,
        borderRadius: 12,
    },

    carouselCardContainer: {
        padding: 20,
    },

    carouselHeader: {
        marginTop: 60,
        borderRadius: 12,
        marginHorizontal: 20,
    }
});