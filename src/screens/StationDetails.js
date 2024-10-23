import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { List, Chip, useTheme, Surface, Button } from 'react-native-paper';
import MapView, { Marker } from "react-native-maps";
import { useGlobalStyles } from '../styles/globalStyles';
import { DEFAULT_REGION, ZOOM_LEVELS } from '../constants/mapConstants';
import { openMap, openPhone } from '../navigation/ExternalNavigation';

export default function StationDetails({ station }) {
    const styles = useGlobalStyles();
    const theme = useTheme();

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

    const hasAnyDetails = station && Object.keys(station).length > 0;

    const hasAdditionalDetails = station && Object.keys(station).some(key => 
        !['name', 'street_address', 'city', 'state', 'zip', 'lat', 'lon'].includes(key) && station[key]
    );

    // Code deleted to avoid multiple API calls. The coordonates will be fetched and savec in database once.
    // Fetch coordinates for the station address
    // const [coordinates, setCoordinates] = useState(null);
    //useEffect(() => {
    //    const getCoordinates = async () => {
    //        try {
    //            const address = `${station?.street_address}, ${station?.city}, ${station?.state} ${station?.zip}`;
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
        <ScrollView contentContainerStyle={styles.scrollView} style={{backgroundColor: theme.colors.background}}>
            {hasAnyDetails && (
            <>
                <View style={localStyles.mainView}>
                    <Surface elevation={4} style={{ height: 200, width: '100%', marginTop: 10 }}>
                        <MapView
                            style={localStyles.map}
                            region={
                                typeof station?.lat === 'number' && typeof station?.lon === 'number'
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
                                coordinate={{ latitude: station?.lat ? station.lat : 0, longitude: station?.lon ? station.lon : 0 }}
                                title={station?.name ? station.name : 'NO NAME'}
                                description={[
                                    station?.street_address,
                                    station?.city,
                                    [station?.state, station?.zip].filter(Boolean).join(' ')
                                ].filter(Boolean).join(', ')}                          />
                        </MapView>
                    </Surface>

                    {hasAdditionalDetails && (
                    <>
                        <List.Item
                            title={station?.name ? station.name : 'NO NAME'}
                            description={[
                                station?.street_address,
                                station?.city,
                                [station?.state, station?.zip].filter(Boolean).join(' ') 
                            ].filter(Boolean).join(', ')}                            
                            left={props => <List.Icon {...props} icon="map-marker-radius-outline" color={theme.colors.primary} style={{ paddingLeft: 0 }} />}
                            titleStyle={localStyles.title}
                            descriptionStyle={localStyles.addressDescription}
                            style={{marginTop: 10}}
                        />

                        { station?.name && station?.lat && station?.lon && (
                            <Button 
                                mode="contained" 
                                textColor='white' 
                                style={{marginTop: 5}} 
                                icon="map" 
                                onPress={() => openMap({ destinationName: station.name, destinationLat: station?.lat ? station.lat : 0, destinationLon: station?.lon ? station.lon : 0 })}
                                >Show directions in Maps
                            </Button>
                        )}

                        <List.Section>
                            <List.Item
                                title="Details"
                                titleStyle={localStyles.title}
                            />

                            {station?.access_days_time && (
                            <List.Item
                                title="Opening hours"
                                description={station?.access_days_time}
                                left={props => <List.Icon {...props} icon="clock-outline" />}
                            />
                            )}
                            
                            {station?.station_phone && (
                                <Pressable onPress={() => openPhone(station.station_phone)}>
                                    <List.Item
                                        title="Contact"
                                        descriptionStyle={{ 
                                            color: theme.colors.primary,
                                            textDecorationLine: 'underline',
                                            textDecorationColor: theme.colors.primary,
                                            opacity: 0.8  
                                        }}                            
                                        description={station?.station_phone}
                                        left={props => <List.Icon {...props} icon="phone" />}
                                    />
                                </Pressable>
                            )}

                            {station?.station_website && (
                                <List.Item
                                    title="Payment methods"
                                    description={formatPaymentMethods(station.cards_accepted)}
                                    left={props => <List.Icon {...props} icon="credit-card" />}
                                />
                            )}

                            {station?.ev_level2_evse_num > 0 && station.ev_dc_fast_num > 0 &&
                                <List.Item
                                    title="EV Network"
                                    description={`${station?.ev_level2_evse_num} Level 2 • ${station?.ev_dc_fast_num} DC Fast`}
                                    left={props => <List.Icon {...props} icon="gas-station" />}
                                    />
                            }

                            {station?.ev_pricing_info && (
                            <>
                                <List.Item
                                title="Connector types"
                                titleStyle={localStyles.title}
                                />
                                <View style={localStyles.chipContainer}>
                                {station?.ev_connector_types.map((type) => (
                                    <Chip
                                    style={{ backgroundColor: theme.colors.accent }}
                                    key={type}
                                    textStyle={{ color: theme.colors.onAccent, fontSize: 12 }}
                                    >
                                    {type}
                                    </Chip>
                                ))}
                                </View>
                            </>
                            )}
                        </List.Section>
                    </>
                    )}
                </View>
            </>
            )}
            {!hasAnyDetails && (
                <List.Item
                    title="No details found"
                    titleStyle={localStyles.title}
                    description="An error occurred while fetching the station details. Please try again later."
                    descriptionStyle={localStyles.addressDescription}
                    left={props => <List.Icon {...props} icon="alert-circle-outline" />}
                    style={{ width: '100%', height: '100%', justifyContent: 'center'}}
                />
            )}
        </ScrollView>
    );
}


const localStyles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
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

