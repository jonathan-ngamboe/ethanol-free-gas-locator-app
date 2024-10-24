import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { List, useTheme, Surface, Button, Divider, Chip } from 'react-native-paper';
import MapView, { Marker } from "react-native-maps";
import { openMap, openPhone, openLink } from '../navigation/ExternalNavigation';
import { useGlobalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function StationDetails({ route }) {
    const theme = useTheme();
    const styles = useGlobalStyles();

    const { station } = route.params;

    // Format the payment methods
    const formatPaymentMethods = (cards) => {
        if (!cards) return null;
        const methodMap = {
            'V': 'Visa',
            'M': 'MasterCard',
            'D': 'Discover',
            'A': 'AmEx',
            'CREDIT': 'Credit',
            'DEBIT': 'Debit',
            'CASH': 'Cash'
        };
        return cards.split(' ')
            .map(card => methodMap[card] || card)
            .filter(Boolean);
    };

    // Check if the station is available (Status E = Available)
    const getStatusInfo = () => {
        const statusMap = {
            'E': { label: 'Available', color: theme.colors.primary, icon: 'check-circle' },
            'P': { label: 'Planned', color: theme.colors.warning, icon: 'clock-outline' },
            'T': { label: 'Unavailable', color: theme.colors.error, icon: 'alert-circle' }
        };
        return statusMap[station?.status_code] || statusMap['T'];
    };

    const statusInfo = getStatusInfo();

    // Check if the station has any details
    const hasAnyDetails = station && Object.keys(station).length > 0;

    // Check if the station has station details
    const hasStationDetails = station && station.ev_network_web || station.station_phone || station.access_days_time || station.access_code;

    // Check if the station has additional information
    const hasAdditionalInformation = station && station.e85_other_ethanol_blends?.length > 0 || station?.cards_accepted || station?.intersection_directions;

    // Check if the station has destination coordinates
    const hasDestinationCoordinates = station?.latitude && station?.longitude

    return (
        <ScrollView style={[{ backgroundColor: theme.colors.background }, styles.scrollView]} contentContainerStyle={{ flexGrow: 1 }}>
            {hasAnyDetails && (
                <>
                    {/* Map */}
                    { hasDestinationCoordinates && (
                    <View style={styles.contentPaddingHorizontal}>
                        <Surface elevation={4} style={localStyles.mapContainer}>
                            <MapView
                                style={localStyles.map}
                                region={{
                                    latitude: station?.latitude || 0,
                                    longitude: station?.longitude || 0,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02
                                }}
                                zoomEnabled={true}
                            >
                                {station?.station_name && station?.street_address && station?.city && station?.state && station?.zip && (
                                    <Marker
                                        coordinate={{
                                            latitude: station?.latitude || 0,
                                            longitude: station?.longitude || 0
                                        }}
                                        title={station?.station_name}
                                        description={[
                                            station?.street_address,
                                            station?.city,
                                            [station?.state, station?.zip].filter(Boolean).join(' ')
                                        ].filter(Boolean).join(', ')}                          
                                    />
                                )}
                            </MapView>
                        </Surface>
                    </View>
                    )}

                    <View style={localStyles.contentContainer}>
                        {/* Header */}
                        <List.Section style={[styles.listSection, styles.contentPaddingHorizontal]}>
                            {/* Title, address and directions */}
                            {station?.station_name && station?.street_address && station?.city && station?.state && station?.zip && (
                                <List.Item
                                    title={station?.station_name}
                                    description={[
                                        station?.street_address,
                                        station?.city,
                                        [station?.state, station?.zip].filter(Boolean).join(' ')
                                    ].filter(Boolean).join(', ')}
                                    left={props => (
                                        <List.Icon {...props} icon="map-marker" color={theme.colors.primary} />
                                    )}
                                    titleStyle={styles.listTitle}
                                    descriptionStyle={styles.listDescription}
                                />
                            )}

                            {/* Subheader */}
                                <View style={localStyles.headerContainer}>
                                    {station?.status_code && (
                                        <List.Item
                                            title={statusInfo.label}
                                            titleNumberOfLines={2}
                                            left={props => (
                                                <Icon {...props} name={statusInfo.icon} color={statusInfo.color} size={24} />
                                            )}
                                            titleStyle={[ localStyles.subHeaderTitle, {color: statusInfo.color} ]}
                                            style={{ flex: 1 }}
                                        />
                                    )}

                                    { station?.distance && (
                                        <List.Item
                                            title={`${station.distance.toFixed(2)} miles`}
                                            titleNumberOfLines={2}
                                            left={props => <Icon {...props} name="map-marker-distance" color={theme.colors.onBackground} size={24} />}
                                            titleStyle={[ localStyles.subHeaderTitle, {color: theme.colors.onBackground} ]}
                                            style={{ flex: 1 }}
                                        />
                                    )}
                                    
                                    {station?.e85_blender_pump && (
                                        <List.Item
                                            title="Blender Pump"
                                            titleNumberOfLines={2}
                                            left={props => <Icon {...props} name="gas-station" color={theme.colors.onBackground} size={24} />}
                                            titleStyle={[ localStyles.subHeaderTitle, {color: theme.colors.onBackground} ]}
                                            style={{ flex: 1 }}
                                        />
                                    )}
                                </View>
                            
                            { hasDestinationCoordinates && (
                                <Button 
                                    mode="contained" 
                                    textColor='white' 
                                    style={{marginTop: 5}} 
                                    icon="map" 
                                    onPress={() => openMap({ destinationName: station.station_name, destinationLat: station?.latitude ? station.latitude : 0, destinationLon: station?.longitude ? station.longitude : 0 })}
                                    >Show directions in Maps
                                </Button>
                            )}
                        </List.Section>

                        {/* Station details */}
                        {hasStationDetails && (
                            <>

                                <Divider style={styles.divider} />

                                <List.Section title='Station details' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>

                                    {/* Website */}
                                    {station?.ev_network_web && (
                                            <List.Item
                                                title="Website"
                                                description={() => 
                                                    <Pressable onPress={() => openLink(station.ev_network_web)}>
                                                        <Text style={ localStyles.link }>{station.ev_network_web}</Text>
                                                    </Pressable>
                                                }
                                                left={props => <List.Icon {...props} icon="web" />}
                                                titleStyle={styles.listTitle}
                                                style={styles.contentPaddingHorizontal}
                                            />
                                    )}

                                    {/* Open hours */}
                                    {station?.access_days_time && (
                                        <List.Item
                                            title="Opening hours"
                                            description={station.access_days_time}
                                            left={props => <List.Icon {...props} icon="clock-outline" />}
                                            titleStyle={styles.listTitle}
                                            style={styles.contentPaddingHorizontal}
                                        />
                                    )}

                                    {/* Phone */}
                                    {station?.station_phone && (
                                        <Pressable onPress={() => openPhone(station.station_phone)}>
                                            <List.Item
                                                title="Contact"
                                                description={() =>
                                                    <Pressable onPress={() => openPhone(station.station_phone)}>
                                                        <Text style={ localStyles.link }>{station.station_phone}</Text>
                                                    </Pressable>
                                                }
                                                left={props => <List.Icon {...props} icon="phone" />}
                                                titleStyle={styles.listTitle}
                                                style={styles.contentPaddingHorizontal}
                                            />
                                        </Pressable>
                                    )}

                                    {/* public or private */}
                                    {station?.access_code && (
                                        <List.Item
                                            title={(station.access_code).charAt(0).toUpperCase() + (station.access_code).slice(1)}
                                            description={`This is a ${station?.access_code} station`}
                                            left={props => <List.Icon {...props} icon={station.access_code === "public" ? "account-group-outline" : "lock"} />}
                                            titleStyle={styles.listTitle}
                                            style={styles.contentPaddingHorizontal}
                                        />
                                    )}
                                </List.Section>
                            </>
                        )}


                        {/* Additional information */}
                        {hasAdditionalInformation && (
                            <>
                                <Divider style={styles.divider} />

                                <List.Section title='Additional information' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                                    {station?.e85_other_ethanol_blends?.length > 0 && (
                                        <>
                                                <View style={styles.contentPaddingHorizontal}>
                                                    <List.Item title="Ethanol blends" titleStyle={styles.listTitle} left={props => <List.Icon {...props} icon="water" />} />
                                                    <View style={[localStyles.chipsContainer, styles.contentPaddingHorizontal]}>
                                                        <Chip
                                                            style={[localStyles.blend, { backgroundColor: theme.colors.accent }]}
                                                            textStyle={{ color: theme.colors.onAccent }}
                                                        >
                                                            E85
                                                        </Chip>
                                                        {station.e85_other_ethanol_blends.map((blend) => (
                                                            <Chip
                                                                key={blend}
                                                                style={[localStyles.blend, { backgroundColor: theme.colors.accent }]}
                                                                textStyle={{ color: theme.colors.onAccent }}
                                                            >
                                                                {blend}
                                                            </Chip>
                                                        ))}
                                                    </View>
                                                </View>
                                        </>
                                    )}

                                    {/* Payment methods */}
                                    {station?.cards_accepted && (
                                        <>
                                            <View style={styles.contentPaddingHorizontal}>
                                                <List.Item title="Payment methods" titleStyle={styles.listTitle} left={props => <List.Icon {...props} icon="credit-card" />} />
                                                <View style={[localStyles.chipsContainer, styles.contentPaddingHorizontal]}>
                                                    {formatPaymentMethods(station.cards_accepted).map((method) => (
                                                        <Chip
                                                            key={method}
                                                            style={[localStyles.paymentMethod, { backgroundColor: theme.colors.accent }]}
                                                            textStyle={{ color: theme.colors.onAccent }}
                                                        >
                                                            {method}
                                                        </Chip>
                                                    ))}
                                                </View>
                                            </View>
                                        </>
                                    )}

                                    {/* Complementary information */}
                                    {station?.intersection_directions && (
                                        <View style={styles.contentPaddingHorizontal}>
                                            <List.Item
                                                title="Intersection directions"
                                                description={station.intersection_directions}
                                                left={props => <List.Icon {...props} icon="sign-direction" />}
                                                titleStyle={styles.listTitle}
                                                style={localStyles.lastItem}
                                            />
                                        </View>
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
                    titleStyle={styles.listTitle}
                    description="An error occurred while fetching the station details. Please try again later."
                    descriptionStyle={styles.listDescription}
                    left={props => <List.Icon {...props} icon="alert-circle-outline" />}
                    style={{ width: '100%', height: '100%', justifyContent: 'center'}}
                />
            )}
        </ScrollView>
    );
}

const localStyles = StyleSheet.create({
    mapContainer: {
        height: 200,
        width: '100%',
        marginTop: 10,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    contentContainer: {
        paddingVertical: 16,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    link: {
        textDecorationLine: 'underline',
    },

    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },

    blend: {
        marginRight: 8,
    },

    paymentMethod: {
        marginRight: 8,
    },

    lastItem: {
        marginBottom: 16,
    },

    subHeaderTitle: { 
        fontSize: 12,
        fontWeight: 'bold',
    },
});