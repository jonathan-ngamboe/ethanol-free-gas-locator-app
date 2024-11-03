
import { copyToClipboard } from "../navigation/ExternalNavigation";
import { useShowOnMap } from "./mapUtils";


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
export const getMenuItems = (station) => {
    const showOnMap = useShowOnMap();

    return [
        { 
            title: 'Add to favorites',
            icon: 'heart-outline',
            onPress: () => console.log('Add to favorites')
        },
        { 
            title: 'Show on map', 
            icon: 'map-marker-radius-outline', 
            onPress: () => showOnMap(station.longitude, station.latitude, station.id)
        },
        { 
            title: 'Copy address',
            icon: 'content-copy',
            onPress: () => copyToClipboard(getFormattedAddress(station))
        },
    ];
}