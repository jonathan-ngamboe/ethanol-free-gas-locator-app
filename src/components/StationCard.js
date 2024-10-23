import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Card, List, Button, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assurez-vous d'avoir installé ce package
import { useGlobalStyles } from '../styles/globalStyles';

export default function StationCard({ station, onPress, showShadow=true }) {
    const styles = useGlobalStyles();
    const theme = useTheme();

    return (
        <Card
            style={{ ...localStyles.card, backgroundColor: theme.colors.background, ...(showShadow ? styles.shadow : {} ) }}

            elevation={0}
        >
            {/* Header with Title and Distance */}
            <Card.Title
                    title={station?.name ? station.name : 'NO NAME'}
                    titleStyle={[
                    localStyles.stationName,
                    { color: theme.colors.onSurface }
                ]}
                subtitle={[
                    station?.street_address,
                    station?.city,
                    [station?.state, station?.zip].filter(Boolean).join(' ')
                ].filter(Boolean).join(', ')}                
                subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
                right={() => (
                    <View style={localStyles.distanceContainer}>
                        <List.Icon
                            icon="map-marker-distance"
                            size={20}
                            color={theme.colors.onSurfaceVariant}
                        />
                        <Text style={{ color: theme.colors.onSurfaceVariant }}>
                            {station.distance} mi
                        </Text>
                    </View>
                )}
                rightStyle={{ marginRight: 16 }}
                left={props => (
                    <List.Icon
                        {...props}
                        icon="gas-station"
                        color={theme.colors.primary}
                    />
                )}
            />

            {/* Price Section */}
            <Card.Content style={localStyles.content}>
                <View style={localStyles.priceContainer}>
                    <Text
                        style={[
                            localStyles.price,
                            { color: theme.colors.primary }
                        ]}
                        variant="headlineMedium"
                    >
                        ${station.price}
                    </Text>
                    <Text
                        style={{ color: theme.colors.onSurfaceVariant }}
                        variant="titleMedium"
                    >
                        /L E85
                    </Text>
                </View>
            </Card.Content>

            {/* Footer with Status and Button */}
            <View style={localStyles.footer}>
                <Chip
                    mode="flat"
                    style={{
                        backgroundColor: station.isOpen
                            ? theme.colors.successContainer
                            : theme.colors.errorContainer,
                        borderRadius: 8,
                    }}
                    textStyle={{
                        color: station.isOpen
                            ? theme.colors.success
                            : theme.colors.error
                    }}
                >
                    <MaterialCommunityIcons 
                        name={station.isOpen ? "check-circle" : "close-circle"} 
                        size={20} 
                        color={station.isOpen ? theme.colors.success : theme.colors.error} 
                    />
                    {station.isOpen ? ' Open' : ' Closed'}
                </Chip>
                <Button
                    mode="text"
                    onPress={onPress}
                    icon="chevron-right"
                    contentStyle={{ flexDirection: 'row-reverse' }}
                    labelStyle={{ color: theme.colors.primary }}
                >
                    View details
                </Button>
            </View>
        </Card>
    );
}

const localStyles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 25,
        borderRadius: 12,
    },

    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    stationName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    content: {
        paddingHorizontal: 20,
    },

    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },

    price: {
        fontWeight: '700',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingVertical: 20,
    },
});
