import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import React, { useState } from 'react';
import StationCard from '../components/StationCard';
import StationList from '../components/StationList';
import { List, useTheme, Divider, SegmentedButtons } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { openMap } from '../navigation/ExternalNavigation';
import { useStation } from '../context/StationContext';


export default function ListScreen({ navigation }) {
    const theme = useTheme();
    const styles = useGlobalStyles();
    const route = useRoute();

    const { favoriteStations, searchedStations } = useStation();

    const pageTitle = route.params?.pageTitle || 'List';
    const stationList = pageTitle === 'Favorites' ? favoriteStations : pageTitle === 'Search History' ? searchedStations : null;
    const pageIcon = route.params?.pageIcon || 'alert-circle-outline';

    const renderStationCount = () => {
        const count = stationList?.length;
        if (count === 0 || !count) return `No stations in your ${pageTitle?.toLowerCase()}`;
        if (count === 1) return `1 station in your ${pageTitle?.toLowerCase()}`;
        return `${count} stations in your ${pageTitle?.toLowerCase()}`;
    };

    const [viewMode, setViewMode] = useState('detailed');

    const MemoizedStationCard = React.memo(StationCard);


    return (
        <View style={styles.container}>
            <List.Section style={localStyles.contentContainer}>
                {/* Header */}
                <List.Section style={[localStyles.header, styles.contentPaddingHorizontal]}>
                    <List.Item
                        title={renderStationCount()}
                        titleNumberOfLines={3}
                        titleStyle={localStyles.headerTitle}
                        description={stationList?.length > 10 ? 'Swipe to see more' : ''}
                        descriptionStyle={styles.listDescription}
                        left={() => (
                            <List.Icon
                                icon={stationList?.length > 10 ? 'gesture-swipe-vertical' : pageIcon}
                                color={theme.colors.primary}
                            />
                        )}
                    />

                    {/* View mode SegmentedButtons */}
                    {stationList?.length > 0 && (
                    <>
                        <Text style={[styles.listSection, { color: theme.colors.outline, fontWeight: 'bold' }]}>View mode</Text>
                        <SegmentedButtons
                            value={viewMode}
                            density='small'
                            buttons={[
                                {
                                    value: 'simple',
                                    label: 'Simple',
                                    icon: 'view-list',
                                    checkedColor: theme.colors.background,
                                    style: { backgroundColor: viewMode === 'simple' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent' },
                                },
                                {
                                    value: 'detailed',
                                    label: 'Detailed',
                                    icon: 'view-dashboard',
                                    style: { backgroundColor: viewMode === 'detailed' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent' },
                                    checkedColor: theme.colors.background,
                                },
                            ]}
                            onValueChange={(mode) => setViewMode(mode)}
                            style={[{ marginVertical: 10 }, styles.shadow]}
                        />
                    </>    
                    )}
                </List.Section>

                <List.Section style={localStyles.listSection}>

                    {/* Station list */}
                    { viewMode === 'simple' && (
                    <>
                        {/* Simple view */}
                        <StationList stationList={stationList} navigation={navigation} displayHeader={false} showMoreIndicator={false} menuItems={['favorite', 'address']} />
                    </>
                    )}

                    {/* Detailed view */}
                    { viewMode === 'detailed' && (
                        <FlatList
                            data={stationList}
                            keyExtractor={(item) => item?.id}
                            renderItem={({ item }) => (
                                <MemoizedStationCard 
                                    station={item} 
                                    showShadow={false}
                                    onPressCard={() => navigation.navigate('StationDetails', { station: item })}
                                    onPressPrimaryButton={() => openMap({ destinationName: item.station_name, destinationLat: item.latitude, destinationLon: item.longitude })}
                                    onPressSecondaryButton={() => navigation.navigate('StationDetails', { station: item })}
                                    cardContainerStyle={ localStyles.stationCard }
                                    menuItems={['favorite', 'address']}
                                />
                            )}
                            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                            style={{ marginTop: 22 }}
                        />
                    )}
                </List.Section>

            </List.Section>
        </View>
    );
}

const localStyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },

    header: {
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    listSection: {
        flex: 1,
        justifyContent: 'flex-start',
        //backgroundColor: 'red',
        marginVertical: 0,
    },

    stationCard: {
        maxHeight: 200,
    },
});