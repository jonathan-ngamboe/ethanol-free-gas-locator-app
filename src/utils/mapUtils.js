import { useMap } from "../context/MapContext";

export const useShowOnMap = () => {
    const { mapRef } = useMap();
    
    return (longitude, latitude) => {
        // Animate the map to the selected location
        mapRef.current?.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.005, 
            longitudeDelta: 0.005,
        }, 1000);
    };
};