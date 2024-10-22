import React, { useState } from 'react';
import { useGlobalStyles } from '../styles/globalStyles';
import DotMenu from './DotMenu';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Searchbar, List } from 'react-native-paper';
import { OpenMap } from '../navigation/ExternalNavigation';

export default function CardSearchList({navigation}) {
    const styles = useGlobalStyles();
    const [isScrolled, setIsScrolled] = useState(false);

    const stationList = [
        { id: '1', name: 'Shell', distance: 0.5, lat: 29.7604, lon: -95.3698 },
        { id: '2', name: 'Exxon', distance: 1.2, lat: 29.7604, lon: -95.3698 },
        { id: '3', name: 'BP', distance: 2.3, lat: 29.7604, lon: -95.3698 },
        { id: '4', name: 'Chevron', distance: 3.5, lat: 29.7604, lon: -95.3698 },
        { id: '5', name: 'Valero', distance: 5.0, lat: 29.7604, lon: -95.3698 },
    ];

    const renderStationCount = () => {
        if (stationList.length === 0) return 'No station found';
        if (stationList.length === 1) return '1 station found';
        return `${stationList.length} stations found`;
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
            title: 'View details', 
            icon: 'information-variant', 
            onPress: () => navigation.navigate('StationDetails')
        },
        { 
            title: 'Show on map', 
            icon: 'map-marker-radius-outline', 
            onPress: () => console.log('Show on map')
        },
        { 
            title: 'Directions', 
            icon: 'map', 
            onPress: () => OpenMap({
                destinationName: station.name,
                destinationLat: station.lat,
                destinationLon: station.lon
            })
        },
    ];

    return (
        <Card style={{...localStyles.card, ...styles.cardBackgroundColor}}>
            <Searchbar
                placeholder="Search near ethanol stations"
                inputStyle={localStyles.searchInput}
                style={{...localStyles.searchBar, ...styles.searchBar}}
                //onChangeText={setSearchQuery}
                //value={searchQuery}
            />
            <Card.Content style={localStyles.contentContainer}>
                <List.Subheader style={localStyles.subheader}>
                    {renderStationCount()}
                </List.Subheader>
                <View style={localStyles.listContainerWrapper}>
                    <View style={localStyles.listContainer}>
                        <FlatList
                            data={stationList}
                            renderItem={({item}) => (
                                <View>
                                    <List.Section>
                                        <List.Item 
                                            title={item.name} 
                                            titleStyle={{fontWeight: 'bold'}}
                                            description={`${item.distance} miles away`}
                                            left={props => <List.Icon {...props} icon="gas-station" style={{ paddingLeft: 30 }} />}
                                            right={props =><DotMenu itemID={item.id} props={props} items={getMenuItems(item)} />}
                                            onPress={() => navigation.navigate('StationDetails')}
                                        />
                                    </List.Section>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        />
                    </View>
  
                    {hasMoreItems && !isScrolled && (
                        <View style={localStyles.moreIndicatorContainer}>
                            <Text style={{ ...localStyles.moreIndicator, ...styles.moreIndicator }}>
                                ↓ {stationList.length - 3} more stations
                            </Text>
                        </View>
                    )}
                </View>
            </Card.Content>     
        </Card>
    );
}

const localStyles = StyleSheet.create({
    card: {
        borderRadius: 20,
        width: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,   
        paddingBottom: 10,
    },

    searchBar: {
        backgroundColor: 'transparent',
        borderWidth: StyleSheet.hairlineWidth,
        height: 36, 
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 30,
    },

    searchInput: {
        fontSize: 14,
        minHeight: 0, 
        paddingBottom: 0, 
        textAlignVertical: 'center', 
    },

    contentContainer: {
        paddingHorizontal: 0,
    },

    subheader: {
        textAlign: 'center',
        paddingHorizontal: 16,
    },

    listContainerWrapper: {
        position: 'relative',
        height: 250,
    },

    listContainer: {
        flex: 1,
    },

    moreIndicatorContainer: {
        position: 'absolute',
        bottom: 0,
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
});