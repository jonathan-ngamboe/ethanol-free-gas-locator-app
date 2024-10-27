import { View, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import Modal from "../components/Modal";
import Map from "../components/Map";
import SearchBar from '../components/SearchBar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import StationCarousel from "../components/StationCarousel";
import { IconButton, useTheme } from 'react-native-paper';
import { useRoute, useFocusEffect } from '@react-navigation/native';  
import StationList from "../components/StationList";
import Filters from "../components/Filters";
import Animated, { FadeIn, FadeOut, runOnJS } from 'react-native-reanimated';
import React, { useState, useRef, useCallback, useEffect } from "react";

export default function DiscoverScreen({navigation}) {
    const route = useRoute();
    const params = route.params;
    const theme = useTheme();
    const [viewMode, setViewMode] = useState('detailed');
    const [filters, setFilters] = useState({});
    
    // State to handle animations
    const [shouldRenderCarousel, setShouldRenderCarousel] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalControls, setModalControls] = useState(null);
    const [isFiltersVisible, setFiltersVisibility] = useState(false);
    
    // Timer ref to handle cleanup
    const timerRef = useRef(null);

    // Cleanup function for timers
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    // Modal control functions
    const minimizeModal = useCallback(() => {
        if (modalControls) {
            modalControls.minimize();
            if (viewMode === 'detailed') {
                setIsModalVisible(false);
            }
        }
    }, [modalControls, viewMode]);

    const openModal = useCallback((snapIndex = 1) => {
        if (modalControls) {
            setIsModalVisible(true);
            modalControls.snapTo(snapIndex);
        } else {
            setIsModalVisible(true);
            timerRef.current = setTimeout(() => modalControls?.snapTo(snapIndex), 100);
        }
    }, [modalControls]);

    // Carousel animation callback
    const handleCarouselAnimationEnd = useCallback(() => {
        if (viewMode === 'simple') {
            setShouldRenderCarousel(false);
        }
    }, [viewMode]);

    // View mode change handler
    const handleViewModeChange = useCallback((newViewMode) => {
        const handleTransition = () => {
            if (newViewMode === 'simple') {
                setShouldRenderCarousel(false);
                setViewMode(newViewMode);
                timerRef.current = setTimeout(() => {
                    setIsModalVisible(true);
                    openModal(1); // Open modal at the middle snap point for simple view
                }, 300);
            } else {
                setViewMode(newViewMode);
                setShouldRenderCarousel(true);
                setIsModalVisible(false);
            }
        };

        // If modal is visible, close it first
        if (isModalVisible) {
            timerRef.current = setTimeout(handleTransition, 300);
        } else {
            handleTransition();
        }
        
        setFiltersVisibility(false);
    }, [isModalVisible, openModal, minimizeModal]);

    // Filter functions
    const filterIcon = (
        <IconButton
            icon='tune'
            size={25}
            onPress={() => openFilters()}
            iconColor={theme.colors.onBackground}
        />
    );

    const openFilters = useCallback(() => {
        Keyboard.dismiss();
        if (!isFiltersVisible) {
            setFiltersVisibility(true);
            openModal(2); // Open modal at the top snap point for filters
        }
    }, [isFiltersVisible, isModalVisible, openModal]);

    const closeFilters = useCallback(() => {
        if (isFiltersVisible) {
            setFiltersVisibility(false);
            if (viewMode === 'simple') {
                openModal(1);
            } else {
                minimizeModal();
            }
        }
    }, [isFiltersVisible, viewMode, openModal]);

    const renderFilters = useCallback(() => (
        <Filters 
            closeFilters={closeFilters} 
            viewMode={viewMode} 
            setViewMode={handleViewModeChange} 
            setFiltersData={setFilters}
        />
    ), [closeFilters, viewMode, handleViewModeChange]);

    // Search bar handling
    const searchBarRef = useRef(null);  
    const {openKeyboard = false} = params || {};

    useFocusEffect(
        React.useCallback(() => {
            if (searchBarRef.current && openKeyboard) {
                searchBarRef.current.focus();
                navigation.setParams({
                    ...params,
                    openKeyboard: false
                });
            }
        }, [openKeyboard, navigation, params])
    );

    // Map interaction
    const handleMapTouch = useCallback(() => {
        Keyboard.dismiss();
        setFiltersVisibility(false);
        minimizeModal();
    }, [minimizeModal]);

    // Station rendering
    const renderStationCarousel = useCallback(() => (
        <StationCarousel 
            stationList={stationList} 
            navigation={navigation} 
            showHeader={true}
            containerStyle={localStyles.carouselContainer} 
            cardContainerStyle={localStyles.carouselCardContainer}
            headerStyle={[localStyles.carouselHeader, {backgroundColor: theme.colors.background}]}
        />
    ), [theme.colors.background, navigation]);

    const renderStationList = useCallback(() => (
        <StationList stationList={stationList} navigation={navigation} />
    ), [navigation]);

    // Dummy data
    const exampleE85Station = {
        id: 1519,
        station_name: "Springfield E85 Station",
        fuel_type_code: "E85",
        street_address: "1394 S Sepulveda Blvd",
        city: "Los Angeles",
        state: "CA",
        zip: "90024",
        status_code: "T",
        access_code: "public",
        access_days_time: "24 hours daily",
        e85_blender_pump: true,
        e85_other_ethanol_blends: ["E15", "E20-E25"],
        cards_accepted: "CREDIT DEBIT CASH V M D A",
        ev_network_web: "http://www.example.com",
        station_phone: "310-555-0123",
        facility_type: "GAS_STATION",
        latitude: 34.0453,
        longitude: -118.4441,
        intersection_directions: "Corner of Sepulveda and Santa Monica Blvd",
        distance: 0.5,
    };
    
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
                        <SearchBar
                            barRef={searchBarRef}
                            leftIcon='map-marker'
                            onLeftIconPress={() => console.log('Map icon pressed')}
                            rightComponent={filterIcon}
                        />
                    </View>

                    {(shouldRenderCarousel && viewMode === 'detailed') && (
                        <Animated.View
                            entering={FadeIn.duration(500)}
                            exiting={FadeOut.duration(500).withCallback((finished) => {
                                if (finished) {
                                    runOnJS(handleCarouselAnimationEnd)();
                                }
                            })}
                            style={localStyles.carouselContainer}
                        >
                            {renderStationCarousel()}
                        </Animated.View>
                    )}

                    {isModalVisible && (
                        <Modal 
                        initialSnapIndex={isFiltersVisible ? 2 : 1} // Default to the initial snap point depending on the state of the filters
                        snapToOnAction={setModalControls}
                            stationList={stationList}
                            renderItem={() => isFiltersVisible ? renderFilters() : renderStationList()}
                            onDismiss={() => {
                                setIsModalVisible(false);
                                if (isFiltersVisible) {
                                    setFiltersVisibility(false);
                                }
                            }}
                        />
                    )}
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
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
        borderRadius: 12,
        marginBottom: 5,
    },

    carouselCardContainer: {
        padding: 20,
    },

    carouselHeader: {
        borderRadius: 12,
        marginHorizontal: 20,
    }
});