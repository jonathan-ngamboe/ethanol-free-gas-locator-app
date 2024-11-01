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
import { getAllStations, getNearbyStations } from "../services/stationService";
import * as Location from 'expo-location';
import { useSnackbar } from '../context/SnackbarContext';



export default function DiscoverScreen({navigation}) {
    const route = useRoute();
    const params = route.params;
    const theme = useTheme();
    const [viewMode, setViewMode] = useState('detailed');
    const [filters, setFilters] = useState({});
    const { showSnackbar } = useSnackbar();
    // State to handle animations
    const [shouldRenderCarousel, setShouldRenderCarousel] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalControls, setModalControls] = useState(null);
    const [isFiltersVisible, setFiltersVisibility] = useState(false);
    // Stations 
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);
    // Location
    const [userLocation, setLocation] = useState(null);
    // Search bar handling
    const searchBarRef = useRef(null);  
    const {openKeyboard = false} = params || {};
    // Timer ref to handle cleanup
    const timerRef = useRef(null);
    // Index of the selected station on the map
    const [selectedStationIndex, setSelectedStationIndex] = useState(null);

    // Filter icon
    const filterIcon = (
        <IconButton
            icon='tune'
            size={25}
            onPress={() => openFilters()}
            iconColor={theme.colors.onBackground}
        />
    );

    ///// Callbacks /////

    // Fetch stations
    const getStations = useCallback((longitude, latitude) => {
        setLoading(true);
        getNearbyStations(longitude, latitude)
            .then(stations => {
                setStations(stations);
                setLoading(false);
            })
            .catch(error => {
                showSnackbar('Error fetching stations:', error);
                console.error('Error fetching stations:', error);
            });
    }, [userLocation]);

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

    const openFilters = useCallback(() => {
        Keyboard.dismiss();
        if(isFiltersVisible) {
            closeFilters();
        } else {
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
            handleFilters={handleApplyFilters}
        />
    ), [closeFilters, viewMode, handleViewModeChange]);

    handleApplyFilters = useCallback((filters) => {
        setFilters(filters);
        console.log('Filters applied:', filters);
    }, [filters]);

    // Focus on search bar when the screen is focused and openKeyboard is true
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
            stationList={stations} 
            navigation={navigation} 
            showHeader={true}
            containerStyle={localStyles.carouselContainer} 
            cardContainerStyle={localStyles.carouselCardContainer}
            headerStyle={[localStyles.carouselHeader, {backgroundColor: theme.colors.background}]}
            loading={loading}
            selectedIndex={selectedStationIndex}
        />
    ), [navigation, stations, selectedStationIndex]);

    const renderStationList = useCallback(() => (
        <View style={{height: '100%'}}>
            <StationList stationList={stations} navigation={navigation} />
        </View>
    ), [navigation, stations]);


    ///// useEffects /////

    // Fetch stations when userLocation changes
    useEffect(() => {
        if (userLocation) {
            getStations(userLocation?.longitude, userLocation?.latitude);
        }
    }, [userLocation]);

    // Cleanup function for timers
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    // Get user's userLocation when the component mounts
    useEffect(() => {
        function getLocation() {
            setLoading(true);
            Location.requestForegroundPermissionsAsync()
                .then(response => {
                    if (response.status !== 'granted') {
                        showSnackbar('Permission to access userLocation was denied. Please enable userLocation services to view nearby stations.');
                        return;
                    }
                    return Location.getCurrentPositionAsync({});
                })
                .then(userLocation => {
                    if (userLocation) {
                        setLocation(userLocation.coords);
                    }
                })
                .catch(error => {
                    showSnackbar('Error fetching userLocation:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        
        getLocation();
    }, []);
    

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <BottomSheetModalProvider>
                <View style={localStyles.container}>
                    <Map 
                        onTouch={handleMapTouch} 
                        markers={stations} 
                        userCoordinates={userLocation} 
                        navigation={navigation} 
                        setMarkerIndex={setSelectedStationIndex}
                    />
                        
                    {/* Search bar */}  
                    <View style={localStyles.searchBarContainer}>
                        <SearchBar
                            barRef={searchBarRef}
                            leftIcon='map-marker'
                            onLeftIconPress={() => console.log('Map icon pressed')}
                            rightComponent={filterIcon}
                            isLoading={loading}  
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
                                stationList={stations}
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
        paddingVertical: 20,
    },

    carouselHeader: {
        borderRadius: 12,
        marginHorizontal: 20,
    },

});