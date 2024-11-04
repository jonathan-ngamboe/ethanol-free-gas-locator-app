import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useSnackbar } from './SnackbarContext';
import { useAuth } from './AuthContext';
import { getStationDetails } from '../services/stationService';

const StationContext = createContext();

export const StationProvider = ({ children }) => {
    const [nearbyStations, setNearbyStations] = useState([]);
    const [favoriteStations, setFavoriteStations] = useState([]);
    const [searchedStations, setSearchedStations] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { session } = useAuth();
    const { showSnackbar } = useSnackbar();

    // Fetch favorite stations on mount and when session changes
    useEffect(() => {
        if (session?.user) {
            fetchFavoriteStations();
            fetchSearchHistory();  
        }
    }, [session]);

    // Fetch favorite stations
    async function fetchFavoriteStations() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('favorite_stations')
                .select(`
                    id,
                    station_id,
                    created_at
                `)
                .eq('profile_id', session?.user?.id);

            if (error) throw error;

            const stations = await Promise.all(
                data.map(async favorite => {
                    const station = await getStationDetails(favorite.station_id);
                    return {
                        ...station,
                        favorite_id: favorite.id // Store the favorite record ID
                    };
                })
            );
            setFavoriteStations(stations);
        } catch (error) {
            console.error('Error fetching favorite stations:', error);
            showSnackbar('Error fetching favorite stations');
        } finally {
            setLoading(false);
        }
    }

    // Add favorite station
    async function addFavoriteStation(stationId) {
        if (!stationId) {
            console.error('Invalid station ID provided');
            showSnackbar('Error adding favorite: Invalid station ID');
            return;
        }

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('favorite_stations')
                .insert([{
                    profile_id: session?.user?.id,
                    station_id: stationId
                }])
                .select();

            if (error) throw error;

            // Fetch the station details and add to state
            const stationDetails = await getStationDetails(stationId);
            setFavoriteStations(prev => [...prev, {
                ...stationDetails,
                favorite_id: data[0].id
            }]);
            
            showSnackbar('Station added to favorites');
        } catch (error) {
            console.error('Error adding favorite:', error);
            showSnackbar('Error adding favorite');
        } finally {
            setLoading(false);
        }
    }

    // Remove favorite station
    async function removeFavoriteStation(stationId) {
        if (!stationId) {
            console.error('Invalid station ID provided');
            showSnackbar('Error removing favorite: Invalid station ID');
            return;
        }

        try {
            setLoading(true);
            const { error } = await supabase
                .from('favorite_stations')
                .delete()
                .eq('profile_id', session?.user?.id)
                .eq('station_id', stationId);

            if (error) throw error;

            setFavoriteStations(prev => 
                prev.filter(station => station.id !== stationId)
            );
            
            showSnackbar('Station removed from favorites');
        } catch (error) {
            console.error('Error removing favorite:', error);
            showSnackbar('Error removing favorite');
        } finally {
            setLoading(false);
        }
    }


    return (
        <StationContext.Provider value={{
            loading,
            nearbyStations,
            setNearbyStations,
            favoriteStations,
            addFavoriteStation,
            removeFavoriteStation,
            searchedStations,
            searchHistory,
            clearSearchHistory,
            addToSearchHistory
        }}>
            {children}
        </StationContext.Provider>
    );
};

export const useStation = () => {
    const context = useContext(StationContext);
    if (!context) {
        throw new Error('useStation must be used within a StationProvider');
    }
    return context;
};