import MapView, { Marker } from "react-native-maps";
import { DEFAULT_REGION, ZOOM_LEVELS } from '../constants/mapConstants';
import { StyleSheet } from "react-native";

export default function Map() {
    return (
        <MapView
            style={localStyles.map}
            initialRegion={DEFAULT_REGION}
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={true}
            zoomLevel={ZOOM_LEVELS.CITY}
        />
    );
}

const localStyles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});