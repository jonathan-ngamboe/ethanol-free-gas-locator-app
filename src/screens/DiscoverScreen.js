import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Modal from "../components/Modal";
import Map from "../components/Map";
import SearchBar from "../components/SearchBar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import StationCarousel from "../components/StationCarousel";
import { IconButton, useTheme } from "react-native-paper";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import StationList from "../components/StationList";
import Filters from "../components/Filters";
import Animated, { FadeIn, FadeOut, runOnJS } from "react-native-reanimated";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { getNearbyStations } from "../services/stationService";
import { useSnackbar } from "../context/SnackbarContext";
import {
  initialFilters,
  initialViewMode,
  initialSortBy,
} from "../constants/filtersConstants";
import { useLocation } from "../context/LocationContext";
import { useStation } from "../context/StationContext";
import { useMap } from "../context/MapContext";
import { fetchCoordinates } from "../services/api";

export default function DiscoverScreen({ navigation }) {
  const route = useRoute();
  const params = route.params;
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  // State to handle animations
  const [shouldRenderCarousel, setShouldRenderCarousel] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalControls, setModalControls] = useState(null);
  const [isFiltersVisible, setFiltersVisibility] = useState(false);
  // Stations
  const { setNearbyStations } = useStation();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  // Location
  const {
    userLocation,
    setUserLocation,
    getUserLocation,
    isLoading: locationLoading,
  } = useLocation();
  const [searchLocation, setSearchLocation] = useState(""); // Location from the search bar (street, city, state, postal code)
  const [startingPoint, setStartingPoint] = useState({}); // Starting point for the map
  // Search bar handling
  const searchBarRef = useRef(null);
  const { openKeyboard = false } = params || {};
  // Timer ref to handle cleanup
  const timerRef = useRef(null);
  // Index of the selected station on the map
  const [selectedStationIndex, setSelectedStationIndex] = useState(null);
  // Filters
  const [filters, setFilters] = useState(initialFilters);
  // View mode
  const [viewMode, setViewMode] = useState(initialViewMode);
  // Sort by
  const [sortBy, setSortBy] = useState(initialSortBy);
  // Map context
  const { setMapRef } = useMap();

  // Filter icon
  const filterIcon = (
    <IconButton
      icon="tune"
      size={25}
      onPress={() => openFilters()}
      iconColor={theme.colors.onBackground}
    />
  );

  ///// Callbacks /////

  // Fetch stations
  const performSearch = useCallback(
    async (searchParams) => {
      const { location, longitude, latitude, filters } = searchParams;

      if (!location && (!longitude || !latitude)) return;

      setLoading(true);

      try {
        let searchLongitude = longitude;
        let searchLatitude = latitude;

        // Si une adresse est fournie mais pas de coordonnées, récupérer les coordonnées
        // If an address is provided but no coordinates, fetch the coordinates since NREL API do not accept address as a parameter anymore
        if (location && (!longitude || !latitude)) {
          const coordinates = await fetchCoordinates(location);
          if (coordinates) {
            searchLongitude = coordinates.lon;
            searchLatitude = coordinates.lat;
          } else {
            throw new Error("Could not find coordinates for this location");
          }
        }

        const response = await getNearbyStations(
          searchLongitude,
          searchLatitude,
          filters
        );
        const stations = response?.fuel_stations;
        setStations(stations);
        handleSort(sortBy);

        // Set the starting point for the map
        const startingLongitude = response?.longitude || searchLongitude;
        const startingLatitude = response?.latitude || searchLatitude;
        setStartingPoint({
          longitude: startingLongitude,
          latitude: startingLatitude,
        });
      } catch (error) {
        showSnackbar("Error fetching stations");
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar, sortBy, handleSort]
  );

  // Modal control functions
  const minimizeModal = useCallback(() => {
    if (modalControls) {
      modalControls.minimize();
      if (viewMode === "detailed") {
        setIsModalVisible(false);
      }
    }
  }, [modalControls, viewMode]);

  const openModal = useCallback(
    (snapIndex = 1) => {
      if (modalControls) {
        setIsModalVisible(true);
        modalControls.snapTo(snapIndex);
      } else {
        setIsModalVisible(true);
        timerRef.current = setTimeout(
          () => modalControls?.snapTo(snapIndex),
          100
        );
      }
    },
    [modalControls]
  );

  // Carousel animation callback
  const handleCarouselAnimationEnd = useCallback(() => {
    if (viewMode === "simple") {
      setShouldRenderCarousel(false);
    }
  }, [viewMode]);

  // View mode change handler
  const handleViewModeChange = useCallback(
    (newViewMode) => {
      const handleTransition = () => {
        if (newViewMode === "simple") {
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
    },
    [isModalVisible, openModal, minimizeModal]
  );

  const openFilters = useCallback(() => {
    Keyboard.dismiss();
    if (isFiltersVisible) {
      closeFilters();
    } else {
      setFiltersVisibility(true);
      openModal(2); // Open modal at the top snap point for filters
    }
  }, [isFiltersVisible, isModalVisible, openModal]);

  const closeFilters = useCallback(() => {
    if (isFiltersVisible) {
      setFiltersVisibility(false);
      if (viewMode === "simple") {
        openModal(1);
      } else {
        minimizeModal();
      }
    }
  }, [isFiltersVisible, viewMode, openModal]);

  const handleSort = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setStations((prevStations) => {
      const sortedStations = [...prevStations];
      if (newSortBy === "nearest") {
        sortedStations.sort((a, b) => a.distance - b.distance);
      } else if (newSortBy === "name") {
        sortedStations.sort((a, b) =>
          a.station_name.localeCompare(b.station_name)
        );
      }
      return sortedStations;
    });
  }, []);

  const renderFilters = useCallback(
    () => (
      <Filters
        sortBy={sortBy}
        setSortBy={handleSort}
        viewMode={viewMode}
        setViewMode={handleViewModeChange}
        onApply={handleApplyFilters}
        filters={filters}
        setFilters={setFilters}
      />
    ),
    [closeFilters, viewMode, handleViewModeChange]
  );

  const handleApplyFilters = useCallback(
    (newFilters) => {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters, ...newFilters };

        // Perform a new search with the updated filters
        if (searchLocation.trim()) {
          performSearch({
            location: searchLocation.trim(),
            filters: updatedFilters,
          });
        } else if (userLocation) {
          performSearch({
            longitude: userLocation?.longitude,
            latitude: userLocation?.latitude,
            filters: updatedFilters,
          });
        }

        return updatedFilters;
      });
    },
    [searchLocation, userLocation, performSearch]
  );

  const handleSearch = useCallback(() => {
    if (!searchLocation.trim()) return;

    performSearch({
      location: searchLocation.trim(),
      filters,
    });
  }, [searchLocation, filters, performSearch]);

  // Focus on search bar when the screen is focused and openKeyboard is true
  useFocusEffect(
    React.useCallback(() => {
      if (searchBarRef.current && openKeyboard) {
        searchBarRef.current.focus();
        navigation.setParams({
          ...params,
          openKeyboard: false,
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
  const renderStationCarousel = useCallback(
    () => (
      <StationCarousel
        stationList={stations}
        navigation={navigation}
        showHeader={true}
        containerStyle={localStyles.carouselContainer}
        cardContainerStyle={localStyles.carouselCardContainer}
        headerStyle={[
          localStyles.carouselHeader,
          { backgroundColor: theme.colors.background },
        ]}
        loading={loading}
        selectedIndex={selectedStationIndex}
      />
    ),
    [navigation, stations, selectedStationIndex]
  );

  const renderStationList = useCallback(
    () => (
      <View style={{ height: "100%" }}>
        <StationList stationList={stations} navigation={navigation} />
      </View>
    ),
    [navigation, stations]
  );

  ///// useEffects /////

  // Cleanup function for timers
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Initial search
  useEffect(() => {
    if (userLocation?.longitude && userLocation?.latitude) {
      performSearch({
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
        filters,
      });
      setNearbyStations(stations);
    } else if (searchLocation) {
      performSearch({ location: searchLocation, filters });
    }
  }, [userLocation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <BottomSheetModalProvider>
        <View style={localStyles.container}>
          <Map
            onTouch={handleMapTouch}
            markers={stations}
            userLocation={userLocation}
            navigation={navigation}
            setMarkerIndex={setSelectedStationIndex}
            setMapRef={setMapRef}
            startingPoint={startingPoint}
          />

          {/* Search bar */}
          <View style={localStyles.searchBarContainer}>
            <SearchBar
              barRef={searchBarRef}
              leftIcon="map-marker"
              onLeftIconPress={() => getUserLocation()}
              rightComponent={filterIcon}
              loading={loading || locationLoading}
              placeholder={
                userLocation && !searchLocation
                  ? "Current location"
                  : "Search by location"
              }
              onSubmit={() => handleSearch()}
              searchQuery={searchLocation}
              editable={!loading && !locationLoading}
              setSearchQuery={(query) => {
                setSearchLocation(query);
                if (query.trim() === "") {
                  setUserLocation(null); // Clear userLocation when search bar is empty. If the user needs to search again with the current userLocation, they can click the map left icon
                }
              }}
            />
          </View>

          {shouldRenderCarousel && viewMode === "detailed" && (
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
              renderItem={() =>
                isFiltersVisible ? renderFilters() : renderStationList()
              }
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
    position: "relative",
  },

  searchBarContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },

  carouselContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
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
