
import { copyToClipboard } from "../navigation/ExternalNavigation";
import { useShowOnMap } from "./mapUtils";
import { share, openEmail } from "../navigation/ExternalNavigation";
import { contactEmail } from "../constants/generalConstants";
import { useStation } from "../context/StationContext";
import { useSnackbar } from "../context/SnackbarContext";

// Format the address
export const getFormattedAddress = (station) => {
    const parts = [
        station?.street_address,
        station?.city,
        station?.state && station?.zip ? `${station.state} ${station.zip}` : null
    ].filter(Boolean);
    return parts.join(', ');
};


// Menu items
export const getMenuItems = (station = {}, menuTypes = ['favorite', 'map', 'address']) => {
    const showOnMap = useShowOnMap();
    const { showSnackbar } = useSnackbar();
    const { favoriteStations, addFavoriteStation, removeFavoriteStation, loading } = useStation();

    const getFavoriteMenuItem = () => {
        const isFavorite = favoriteStations.some(favorite => 
            String(favorite.station_id) === String(station.station_id || station.id)
        );
        
        return {
            title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
            icon: isFavorite ? 'heart' : 'heart-outline',
            onPress: () => {
                if (loading) return;
                
                if (isFavorite) {
                    const stationIdToRemove = station.station_id || station.id;
                    const favoriteToRemove = favoriteStations.find(f => 
                        String(f.station_id) === String(stationIdToRemove)
                    );
                    
                    if (favoriteToRemove) {
                        removeFavoriteStation({
                            ...station,
                            id: stationIdToRemove
                        }).catch(error => {
                            showSnackbar('Error removing favorite', error);
                        });
                    }
                } else {
                    addFavoriteStation({
                        ...station,
                        id: station.station_id || station.id
                    }).catch(error => {
                        showSnackbar('Error adding favorite', error);
                    });
                }
            }
        };
    };
    
    const menuConfigs = {
        favorite: {
            ...getFavoriteMenuItem()
        },
        map: {
            title: 'Show on map',
            icon: 'map-marker-radius-outline',
            onPress: () => showOnMap(station?.longitude, station?.latitude, station?.id)
        },
        address: {
            title: 'Copy address',
            icon: 'content-copy',
            onPress: () => copyToClipboard(getFormattedAddress(station))
        },
        share: {
            title: 'Share',
            icon: 'share-variant',
            onPress: () => share('Check out this station!')
        },
        report: {
            title: 'Report',
            icon: 'alert-circle-outline',
            onPress: () => openEmail(contactEmail)
        }
    };
    
    return menuTypes
        .filter(type => menuConfigs[type]) // Filter the visible menu items
        .map(type => menuConfigs[type]);
};