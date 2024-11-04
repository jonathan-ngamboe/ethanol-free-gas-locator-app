import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Card, Button, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DotMenu from './DotMenu';
import { useGlobalStyles } from '../styles/globalStyles';
import { getMenuItems, getFormattedAddress } from '../utils/utils';


export default function StationCard({ station, onPressPrimaryButton, onPressSecondaryButton, showShadow = true, cardContainerStyle, cardColor, menuItems = ['favorite', 'map', 'address'] }) {
    const theme = useTheme();
    const styles = useGlobalStyles();

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

    return (
        <View style={[ showShadow ? styles.shadow : {}, cardContainerStyle ]}>
            <Card 
                mode='contained'
                style={[
                    { backgroundColor: cardColor || theme.colors.background },
                    showShadow ? styles.shadow : {}
                ]}
            >
                <View style={localStyles.cardContent}>
                    <View style={localStyles.content}>
                        {/* Header Section */}
                        <List.Item
                            title={station?.station_name || ''}
                            titleStyle={styles.listTitle}
                            description={getFormattedAddress(station)}
                            left={(props) => (
                                <List.Icon 
                                    {...props} 
                                    icon="gas-station" 
                                    color={theme.colors.primary}
                                />
                            )}
                            right={(props) => (
                                <DotMenu 
                                    {...props} 
                                    items={getMenuItems(station, menuItems)}
                                />
                            )}
                            style={{paddingVertical: 0, paddingRight: 16 }}
                        />

                        {/* Content Section */}
                        <View style={localStyles.infoRow}>
                            {/* Distance */}
                            {station?.distance && (
                                <View style={localStyles.distanceContainer}>
                                    <Icon 
                                        name="map-marker-distance"
                                        size={16}
                                        color={theme.colors.onSurfaceVariant}
                                    />
                                    <Text 
                                        variant="bodyMedium"
                                        style={{ color: theme.colors.onSurfaceVariant }}
                                    >
                                        { station?.distance ? `${station.distance.toFixed(2)} mi` : '' }
                                    </Text>
                                </View>
                            )}
                            {/* Status */}
                            <View style={localStyles.statusContainer}>
                                <Icon 
                                    name={statusInfo.icon}
                                    size={16}
                                    color={statusInfo.color}
                                />
                                <Text 
                                    variant="bodyMedium"
                                    style={{ color: statusInfo.color }}
                                >
                                    {statusInfo.label}
                                </Text>
                            </View>
                        </View>

                        <View style={localStyles.tagsContainer}>
                            {station?.access_days_time && (
                                <View style={localStyles.tag}>
                                    <Icon 
                                        name="clock-outline"
                                        size={14}
                                        color={theme.colors.onSurfaceVariant}
                                    />
                                    <Text 
                                        variant="bodySmall"
                                        style={{ color: theme.colors.onSurfaceVariant }}
                                        numberOfLines={2}
                                    >
                                        {station.access_days_time}
                                    </Text>
                                </View>
                            )}
                            {station?.access_code && (
                                <View style={localStyles.tag}>
                                    <Icon 
                                        name={station.access_code === "public" ? "account-group-outline" : "lock"}
                                        size={14}
                                        color={theme.colors.onSurfaceVariant}
                                    />
                                    <Text 
                                        variant="bodySmall"
                                        style={{ color: theme.colors.onSurfaceVariant }}
                                    >
                                        {station.access_code.charAt(0).toUpperCase() + station.access_code.slice(1)}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Actions Section */}
                        <View style={localStyles.actions}>
                            <Button
                                mode="contained"
                                icon="map"
                                buttonColor={theme.colors.primary}
                                textColor='white'
                                onPress={onPressPrimaryButton}
                                style={localStyles.navigationButton}
                            >
                                Directions
                            </Button>
                            <Button
                                mode="text"
                                icon="chevron-right"
                                onPress={onPressSecondaryButton}
                            >
                                Details
                            </Button>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const localStyles = StyleSheet.create({
    cardContent: {
        height: '100%',
        overflow: 'hidden',
        paddingVertical: 10,
    },

    content: {
        flex: 1,
        justifyContent: 'space-between',
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingBottom: 5,
        paddingTop: 10,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },


    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        paddingHorizontal: 20,
    },

    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },

    navigationButton: {
        flex: 1,
    },
});