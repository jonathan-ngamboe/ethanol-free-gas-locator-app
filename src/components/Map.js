import MapView, { Callout, Marker } from "react-native-maps";
import { DEFAULT_REGION, ZOOM_LEVELS } from '../constants/mapConstants';
import { Pressable, StyleSheet } from "react-native";
import { List, useTheme } from 'react-native-paper';

export default function Map( { onTouch, markers, userCoordinates, navigation, setMarkerIndex }) {
    const theme = useTheme();

    return (
        <MapView
            style={localStyles.map}
            initialRegion={DEFAULT_REGION}
            region={
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
            // NOTE: It's not possible to style Apple Maps so we need to use Google Maps but it requires an API key and Google Map does not work on iOS simulator. It works on Android emulator and real iOS devices.
            //provider="google"  
            //googleMapId={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
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