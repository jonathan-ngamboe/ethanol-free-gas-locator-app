import { View, StyleSheet, ScrollView, Text, StatusBar } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import SearchBar from '../components/SearchBar';
import { Avatar, List, useTheme } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'; 
import StatsCard from '../components/StatsCard';
import DotMenu from '../components/DotMenu';
import React, {useEffect} from 'react';

export default function HomeScreen({navigation}) {
    const styles = useGlobalStyles();
    const theme = useTheme();

    const isFocused = useIsFocused();

    const user = { 
        firstName: 'Monkey D.',
        lastName: 'Luffy',
        email: 'monkey-d@one-piece.rock',
        avatar: 'https://i.pinimg.com/736x/1e/8b/f3/1e8bf3b2adefdfe76bb5dfe9bafe1ed5.jpg',
    };

    const searchBarRightComponent = (
        <Avatar.Image 
            source={{ uri: user?.avatar || 'https://avatar.iran.liara.run/public' }}
            size={45} 
            style={styles.avatar} 
        />
    );

    const navigateToMap = () => {
        navigation.navigate('Map', { 
            openKeyboard: true 
        });
    };

    const ethanolData = {
        price: 2.99,
        change: 0.05,
        changePercentage: 1.7,
        period: 'Last 7 days'
    };

    const nearbyStationList = [{
        // Essential station identification
        id: 1519,
        station_name: "Springfield E85 Station",
        fuel_type_code: "E85",  // Important pour identifier le type de carburant
        
        // Location information
        street_address: "1394 S Sepulveda Blvd",
        city: "Los Angeles",
        state: "CA",
        zip: "90024",
        
        // Station status and accessibility
        status_code: "T",      // E = Available, P = Planned, T = Temporarily Unavailable
        access_code: "public", // public ou private
        access_days_time: "24 hours daily",
        
        // E85 specific information
        e85_blender_pump: true,  // Indique si la station a une pompe de mélange
        e85_other_ethanol_blends: ["E15", "E20-E25"], // Autres mélanges disponibles
        
        // Payment information
        cards_accepted: "CREDIT DEBIT CASH V M D A", // Types de paiement acceptés
        
        // Additional useful information
        ev_network_web: "http://www.example.com", // Site web de la station
        station_phone: "310-555-0123",
        access_days_time: "24 hours daily",
        facility_type: "GAS_STATION", // Type d'établissement
        
        // Optionnel : informations de navigation
        latitude: 34.0453,
        longitude: -118.4441,
        intersection_directions: "Corner of Sepulveda and Santa Monica Blvd", // Aide à la localisation

        // Distance from the user's location
        distance: 0.5, // Distance en miles
    }];

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

    // Function to display the stations in a list. Note: Flatlist can not be used because of the scrollview
    const renderStationList = (stationList) => {
        return (
            <List.Section style={localStyles.listContainer}>
                {stationList.map((item) => (
                    <List.Item 
                        key={item.id}
                        title={item.station_name} 
                        titleStyle={styles.listTitle}
                        description={`${item.distance} miles away`}
                        left={props => (
                            <List.Icon 
                                {...props} 
                                icon="gas-station" 
                                style={styles.contentPaddingLeft} 
                                color={theme.colors.primary} 
                            />
                        )}
                        right={props => (
                            <DotMenu 
                                itemID={item.id} 
                                color={props.color} 
                                style={props.style} 
                                items={getMenuItems(item)} 
                            />
                        )}
                        onPress={() => navigation.navigate('StationDetails', { station: item })}
                    />
                ))}
            </List.Section>
        );
    };    

    // Change the status bar color depending of the theme only in this screen
    useEffect(() => {
        if (isFocused) {
          StatusBar.setBarStyle(theme.dark ? 'dark-content' : 'light-content');
        } else {
          StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
        }
      }, [isFocused, theme]);

    return (
        <View style={[styles.container, { alignItems: 'stretch' }]}>  

            <View style={[localStyles.headerView, {backgroundColor: theme.colors.onBackground}]}>
                {/* Header */}
                <List.Item
                    title={`Hi, ${user?.firstName || 'there'}!`}
                    description="Find ethanol stations around you."
                    titleStyle={[localStyles.headerTitle, {color: theme.colors.background}]}
                    descriptionStyle={[localStyles.headerDescription, {color: theme.colors.background}]}
                    descriptionNumberOfLines={5}
                    left={() => <Text style={[localStyles.headerTitle, styles.contentPaddingLeft]}>👋</Text>}
                />

                {/* Searcbar */}
                <View style={localStyles.searchBarContainer}>
                {isFocused && 
                    <SearchBar
                        leftIcon='map-marker'
                        onLeftIconPress={navigateToMap} // Open the map when the left icon is pressed and get the user's location (TODO)
                        rightComponent={searchBarRightComponent}
                        onRightComponentPress={() => navigation.navigate('ProfileStack')}
                        onFocus={navigateToMap} // Open the map when the search bar is focused
                        />
                    }
                </View>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollView} style={{backgroundColor: theme.colors.background}} showsHorizontalScrollIndicator={false}>
                <View style={localStyles.contentContainer}>

                    {/* Average price */}
                    <List.Section title='Ethanol price' style={[styles.listSection, localStyles.statsCard, styles.contentPaddingHorizontal]} titleStyle={[styles.listTitle, {color: theme.colors.outline} ]}>
                        <StatsCard 
                            cardColor={theme.colors.onBackground} 
                            value={ethanolData.price}
                            change={ethanolData.change}
                            changePercentage={ethanolData.changePercentage}
                            showChange={true} 
                            title='Average price'
                            subtitle='per gallon'
                            period={ethanolData.period}
                            titleStyle={{color: theme.colors.background}}
                            subtitleStyle={{color: theme.colors.background}}
                            periodStyle={{color: theme.colors.background}}
                            valueStyle={{color: theme.colors.background}}
                        />  
                    </List.Section>

                    { nearbyStationList.length > 0 && (
                    <>
                        {/* Nearby stations */}
                        <List.Section title='Nearby stations' style={[styles.listSection, localStyles.nearbyStationsSection]} titleStyle={[styles.listTitle, styles.contentPaddingLeft, {color: theme.colors.outline} ]}>
                            {renderStationList(nearbyStationList)}
                        </List.Section>
                    </>
                    )}

                </View>
            </ScrollView>
        </View>
    );
}

const localStyles = StyleSheet.create({
    searchBarContainer: {
        alignItems: 'center',
        width: '100%',
        paddingVertical: 3,
    },

    headerView: {
        width: '100%',
        paddingBottom: 20,
    },

    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    headerDescription: {
        fontSize: 15,
    },

    contentContainer: {
        flex: 1,
    },

    nearbyStationsSection: {
    },

    statsCard: {
        marginTop: 10,
    },

    listContainer: {
    }
});