import React, { useState } from 'react';
import { useGlobalStyles } from '../styles/globalStyles';
import DotMenu from './DotMenu';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { List, useTheme, Divider } from 'react-native-paper';
import { openMap } from '../navigation/ExternalNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function stationList({ stationList, navigation }) {
    const styles = useGlobalStyles();
    const [isScrolled, setIsScrolled] = useState(false);
    const theme = useTheme();

    const renderStationCount = () => {
        if (stationList.length === 0) return 'No station found';
        if (stationList.length === 1) return '1 Station found';
        return `${stationList.length} Stations found`;
    };

    // More items indicator
    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolled(offsetY > 0);
    };

    const hasMoreItems = stationList.length > 3;

    // Menu items
    const getMenuItems = (station) => [
        { 
            title: 'Add to favorites',
            icon: 'heart-outline',
            onPress: () => console.log('Add to favorites')
        },
        { 
            title: 'Show on map', 
            icon: 'map-marker-radius-outline', 
            onPress: () => console.log('Show on map')
        },
        { 
            title: 'Copy address',
            icon: 'content-copy',
            onPress: () => copyToClipboard(getFormattedAddress())
        },
    ];

    return (
        <List.Section style={localStyles.contentContainer}>
            <List.Item
                title={renderStationCount()}
                titleStyle={styles.listTitle}
                description={stationList.length > 0 ? 'Swipe to see more' : 'No station found'}
                descriptionStyle={styles.listDescription}
                left={() => 
                    <List.Icon 
                        icon={stationList.length > 0 ? 'gesture-swipe-vertical' : 'alert-circle-outline'}
                        color={stationList.length > 0 ? theme.colors.primary : theme.colors.error}
                    />}
                style={localStyles.header}
            />
            <List.Section>
                <FlatList
                    data={stationList}
                    renderItem={({item}) => (
                        <View>
                            <List.Section>
                                <List.Item 
                                    title={item.station_name} 
                                    titleStyle={styles.listTitle}
                                    description={`${item.distance} miles away`}
                                    left={props => <List.Icon {...props} icon="gas-station" style={{ paddingLeft: 20 }} />}
                                    right={props =><DotMenu itemID={item.id} color={props.color} style={props.style} items={getMenuItems(item)} />}
                                    onPress={() => navigation.navigate('StationDetails', { station: item })}
                                />
                            </List.Section>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    ItemSeparatorComponent={() => <Divider/>}
                    style={{ height: '100%'}}
                />

            {hasMoreItems && !isScrolled && (
                <View style={localStyles.moreIndicatorContainer}>
                    <Text style={{ ...localStyles.moreIndicator, ...styles.moreIndicator }}>
                        ↓ {stationList.length - 3} more stations
                    </Text>
                </View>
            )}
            </List.Section>
        </List.Section>     
    );
}

const localStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 0,
    },

    header: {
        paddingVertical: 0,
        paddingLeft: 20,
    },
    
    moreIndicatorContainer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    },

    moreIndicator: {
        fontSize: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
    },

    divider: {
        //marginHorizontal: 20,
    },
});