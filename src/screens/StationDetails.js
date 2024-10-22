import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Chip, useTheme, Surface, Button } from 'react-native-paper';
import MapView, { Marker } from "react-native-maps";
import { useGlobalStyles } from '../styles/globalStyles';
import { DEFAULT_REGION, ZOOM_LEVELS } from '../constants/mapConstants';
import { OpenMap } from '../navigation/ExternalNavigation';

export default function StationDetails() {
    const styles = useGlobalStyles();
    const theme = useTheme();

    const station = {
        station_name: "Shell Charging Station",
        street_address: "1234 Main Street",
        city: "Houston",
        state: "TX",
        zip: "77002",
        station_phone: "(555) 123-4567",
        access_days_time: "24 hours daily",
        cards_accepted: "CREDIT V M A",
        ev_connector_types: ["CCS", "CHAdeMO", "J1772"],
        ev_level2_evse_num: 4,
        ev_dc_fast_num: 2,
        status_code: "E",
        lat: 29.7604,
        lon: -95.3698,
    };

    const formatPaymentMethods = (cards) => {
        const methodMap = {
        'V': 'Visa',
        'M': 'MasterCard',
        'A': 'AmEx',
        'CREDIT': 'Credit'
        };
        return cards.split(' ')
        .map(card => methodMap[card] || card)
        .join(', ');
    };

    // Code deleted to avoid multiple API calls. The coordonates will be fetched and savec in database once.
    // Fetch coordinates for the station address
    // const [coordinates, setCoordinates] = useState(null);
    //useEffect(() => {
    //    const getCoordinates = async () => {
    //        try {
    //            const address = `${station.street_address}, ${station.city}, ${station.state} ${station.zip}`;
    //            const coords = await fetchCoordinates(address);
    //            if (coords) {
    //                setCoordinates(coords);
    //            } else {
    //                console.error('No coordinates found for the address:', address);
    //            }
    //        } catch (err) {
    //            console.error(err);
    //        } 
    //    };

    //    getCoordinates();
    //}, []);

    return (
        <ScrollView contentContainerStyle={styles.container} style={{backgroundColor: theme.colors.background}}>
            <View style={localStyles.mainView}>
                <Surface elevation={4} style={{ height: 200, width: '100%' }}>
                    <MapView
                        style={localStyles.map}
                        region={station.lat && station.lon
                            ? {
                                latitude: station.lat,
                                longitude: station.lon,
                                latitudeDelta: ZOOM_LEVELS.CITY,
                                longitudeDelta: ZOOM_LEVELS.NEIGHBORHOOD
                            }
                            : DEFAULT_REGION
                        }
                        zoomEnabled={true}
                        zoomTapEnabled={true}
                        zoomControlEnabled={true}
                    >
                        <Marker
                            coordinate={{ latitude: station?.lat, longitude: station?.lon }}
                            title={station.station_name}
                            description={`${station.street_address}, ${station.city}, ${station.state} ${station.zip}`}
                        />
                    </MapView>
                </Surface>

                <List.Item
                    title={station.station_name}
                    description={`${station.street_address}, ${station.city}, ${station.state} ${station.zip}`}
                    left={props => <List.Icon {...props} icon="map-marker-radius-outline" color={theme.colors.primary} style={{ paddingLeft: 0 }} />}
                    titleStyle={localStyles.title}
                    descriptionStyle={localStyles.addressDescription}
                    style={{marginTop: 10}}
                />

                <Button 
                    mode="contained" 
                    textColor='white' 
                    style={{marginTop: 5}} 
                    icon="map" 
                    onPress={() => OpenMap({ destinationName: station.station_name, destinationLat: station.lat, destinationLon: station.lon })}
                    >Show directions in Maps
                </Button>

                <List.Section>
                    <List.Item
                        title="Details"
                        titleStyle={localStyles.title}
                    />

                    <List.Item
                        title="Opening hours"
                        description={station.access_days_time}
                        left={props => <List.Icon {...props} icon="clock-outline" />}
                    />
                    
                    <List.Item
                        title="Contact"
                        description={station.station_phone}
                        left={props => <List.Icon {...props} icon="phone" />}
                    />

                    <List.Item
                        title="Payment methods"
                        description={formatPaymentMethods(station.cards_accepted)}
                        left={props => <List.Icon {...props} icon="credit-card" />}
                    />

                    <List.Item
                        title="Charging options"
                        description={`${station.ev_level2_evse_num} Level 2 • ${station.ev_dc_fast_num} DC Fast`}
                        left={props => <List.Icon {...props} icon="gas-station" />}
                    />

                    <List.Item
                        title="Connector types"
                        titleStyle={localStyles.title}
                    />
                    <View style={localStyles.chipContainer}>
                        {station.ev_connector_types.map((type) => (
                        <Chip
                            style={{backgroundColor: theme.colors.accent}}
                            key={type}
                            textStyle={{color: theme.colors.onAccent, fontSize: 12}}
                        >
                            {type}
                        </Chip>
                        ))}
                    </View>
                </List.Section>
            </View>
        </ScrollView>
    );
}


const localStyles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
    },

    map: {
        width: '100%',
        height: '100%',
    },
    
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addressDescription: {
        fontSize: 14,
    },

    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingLeft: 17,
    },
});

