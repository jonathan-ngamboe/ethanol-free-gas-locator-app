import MapView, { Callout, Marker } from "react-native-maps";
import { DEFAULT_REGION, ZOOM_LEVELS } from '../constants/mapConstants';
import { Pressable, StyleSheet } from "react-native";
import { List, useTheme } from 'react-native-paper';
import dark from '../../assets/mapStyles/dark.json';

export default function Map( { onTouch, markers, userCoordinates, navigation, setMarkerIndex }) {
    const theme = useTheme();

    // Get the marker with the shortest "distance" value from the search location
    const getMinMarker = (markers) => {
        return markers.reduce((minMarker, currentMarker) => {
            return currentMarker.distance < minMarker.distance ? currentMarker : minMarker;
        }, markers[0]);
    };

    // Calculate the perfect latitude and longitude delta for the map to fit all markers
    const calculateDelta = (markers) => {
        const latitudes = markers.map(marker => marker.latitude);
        const longitudes = markers.map(marker => marker.longitude);

        const maxLat = Math.max(...latitudes);
        const minLat = Math.min(...latitudes);
        const maxLng = Math.max(...longitudes);
        const minLng = Math.min(...longitudes);

        const latitudeDelta = (maxLat - minLat) * 1.2;
        const longitudeDelta = (maxLng - minLng) * 1.2;

        return { latitudeDelta, longitudeDelta };
    };    

    return (
        <MapView
            style={localStyles.map}
            initialRegion={DEFAULT_REGION}
            region={
                markers.length > 0 ? {
                    latitude: getMinMarker(markers).latitude,
                    longitude: getMinMarker(markers).longitude,
                    latitudeDelta: calculateDelta(markers).latitudeDelta,
                    longitudeDelta: calculateDelta(markers).longitudeDelta
                }: 
                userCoordinates ? {
                    latitude: userCoordinates.latitude,
                    longitude: userCoordinates.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                } : DEFAULT_REGION
            }
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={true}
            zoomLevel={ZOOM_LEVELS.CITY}
            onTouchStart={onTouch}
            userInterfaceStyle = {theme.dark ? 'dark' : 'light'} // This is for iOS only
            customMapStyle={theme.dark ? dark : []} // This is for Android only
        >
            {userCoordinates && (
                <Marker
                    coordinate={{
                        latitude: userCoordinates.latitude,
                        longitude: userCoordinates.longitude
                    }}
                    title="You are here"
                    pinColor="blue"
                />
            )}
            {markers?.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={{
                        latitude: marker?.latitude || 0,
                        longitude: marker?.longitude || 0
                    }}
                    title={marker.station_name}
                    description={[
                        marker?.street_address,
                        marker?.city,
                        [marker?.state, marker?.zip].filter(Boolean).join(' ')
                    ].filter(Boolean).join(', ')}  
                    onPress={() => setMarkerIndex(index)}
                >
                    <Callout style={{ backgroundColor: theme.colors.background }} tooltip>
                        <List.Item
                            title={marker.station_name}
                            titleStyle={[{ fontWeight: 'bold'}]}
                            titleNumberOfLines={2}
                            description={[
                                marker?.street_address,
                                marker?.city,
                                [marker?.state, marker?.zip].filter(Boolean).join(' ')
                            ].filter(Boolean).join(', ')}
                            descriptionNumberOfLines={3}
                            left={props => 
                                <Pressable onPress={() => navigation.navigate('StationDetails', { station: marker })}>
                                    <List.Icon {...props} icon="information-outline"/>
                                </Pressable>}
                            style={{ maxWidth: 400 }}
                        />
                    </Callout>
                </Marker>
            ))}
        </MapView>
    );
}

const localStyles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});