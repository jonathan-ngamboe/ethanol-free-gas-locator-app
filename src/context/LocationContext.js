import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSnackbar } from '../context/SnackbarContext';
import * as Location from 'expo-location';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const { showSnackbar } = useSnackbar();

    const checkLocationPermissions = useCallback(async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setHasPermission(status === 'granted');
            return status === 'granted';
        } catch (error) {
            console.error('Error checking permissions:', error);
            setHasPermission(false);
            return false;
        }
    }, []);

    const getUserLocation = useCallback(async () => {
        if (isLoading) return; // Avoid multiple requests

        setIsLoading(true);
        try {
            const permissionGranted = await checkLocationPermissions();
            if (!permissionGranted) {
                showSnackbar('Permission to access location was denied. Please enable location services to view nearby stations.');
                return null;
            }

            // Options to get the most accurate location
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                timeout: 15000,
                maximumAge: 10000
            });

            console.log('Location obtained:', location);
            setUserLocation(location.coords);
            return location;
        } catch (error) {
            console.error('Error getting location:', error);
            showSnackbar('Error getting location: ' + error.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial location check
    useEffect(() => {
        const initLocation = async () => {
            const permissionGranted = await checkLocationPermissions();
            if (permissionGranted) {
                await getUserLocation();
            }
        };
        
        initLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ 
            userLocation, 
            setUserLocation, 
            getUserLocation,
            isLoading,
            hasPermission 
        }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};