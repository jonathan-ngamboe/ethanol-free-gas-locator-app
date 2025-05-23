import React, { useState } from 'react';
import { useGlobalStyles } from '../styles/globalStyles';
import DotMenu from './DotMenu';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { List, useTheme, Divider } from 'react-native-paper';
import { getMenuItems } from '../utils/utils';
import { getFormattedAddress } from '../utils/utils';


export default function stationList({ stationList, navigation, displayHeader = true, showMoreIndicator = true, menuItems = ['favorite', 'map', 'address'] }) {
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

    return (
        <List.Section style={localStyles.contentContainer}>
            {/* Header */}
            {displayHeader && (
            <List.Item
                title={renderStationCount()}
                titleStyle={styles.listTitle}
                description={stationList.length > 0 ? 'Scroll to see more' : 'No station found'}
                descriptionStyle={styles.listDescription}
                left={() => 
                    <List.Icon 
                        icon={stationList.length > 0 ? 'gesture-swipe-vertical' : 'alert-circle-outline'}
                        color={stationList.length > 0 ? theme.colors.primary : theme.colors.error}
                    />}
                style={localStyles.header}
            />
            )}

            {/* Stations */}
            <List.Section>
                <FlatList
                    data={stationList}
                    renderItem={({item}) => (
                        <View>
                            <List.Section>
                                <List.Item 
                                    title={item.station_name} 
                                    titleStyle={styles.listTitle}
                                    description={item?.distance ? `${item?.distance?.toFixed(2)} miles away` : getFormattedAddress(item)}
                                    left={props => <List.Icon {...props} icon="gas-station" style={{ paddingLeft: 20 }} color={theme.colors.primary} />}
                                    right={props =><DotMenu itemID={item.id} color={props.color} style={props.style} items={getMenuItems(item, menuItems)} />}
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

            {hasMoreItems && !isScrolled && showMoreIndicator && (
                <View style={localStyles.moreIndicatorContainer}>
                    <Text style={{ ...localStyles.moreIndicator, ...styles.moreIndicator }}>
                        ↓ more stations
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

});