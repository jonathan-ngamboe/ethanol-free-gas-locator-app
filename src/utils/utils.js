
import { copyToClipboard } from "../navigation/ExternalNavigation";
import { useShowOnMap } from "./mapUtils";
import { share, openEmail } from "../navigation/ExternalNavigation";
import { contactEmail } from "../constants/generalConstants";


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
    
    const menuConfigs = {
        favorite: {
            title: 'Add to favorites',
            icon: 'heart-outline',
            onPress: () => console.log('Add to favorites')
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