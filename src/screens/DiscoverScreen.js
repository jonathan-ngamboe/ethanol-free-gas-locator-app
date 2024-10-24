import React, { useRef } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Modal from "../components/Modal";
import Map from "../components/Map";
import SearchBar from '../components/SearchBar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import StationCarousel from "../components/StationCarousel";

export default function DiscoverScreen({navigation}) {
    const bottomSheetRef = useRef(null);

    // Function to handle the touch event on the map
    const handleMapTouch = () => {
        // Hide the keyboard 
        Keyboard.dismiss();

        // Snap the bottom sheet to the initial position
        if (bottomSheetRef.current) {
            bottomSheetRef.current(0); 
        }
    };

    const renderStationList = () => {
        return (
            <StationCarousel stationList={stationList} navigation={navigation} />
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

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={localStyles.container}>
                    <Map onTouch={handleMapTouch} />
                    
                    <View style={localStyles.searchBarContainer}>
                        <SearchBar navigation={navigation}/>
                    </View>

                    <Modal 
                        initialSnapIndex={1} 
                        snapToOnAction={(snap) => bottomSheetRef.current = snap} 
                        stationList={stationList}
                        renderItem={renderStationList}
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
});