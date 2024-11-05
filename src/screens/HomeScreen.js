import React, {useEffect, useState, useCallback} from 'react';
import { View, StyleSheet, ScrollView, Text, StatusBar } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import SearchBar from '../components/SearchBar';
import { Avatar, List, useTheme } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'; 
import StatsCard from '../components/StatsCard';
import DotMenu from '../components/DotMenu';
import AdsCarousel from '../components/AdsCarousel';
import { getUser } from '../services/userService';
import { useSnackbar } from '../context/SnackbarContext';
import { useStation } from '../context/StationContext';
import { getMenuItems } from '../utils/utils';
import { useLocation } from '../context/LocationContext';


export default function HomeScreen({navigation}) {
    const styles = useGlobalStyles();
    const theme = useTheme();
    const isFocused = useIsFocused();
    const [user, setUser] = useState(null);
    const { showSnackbar } = useSnackbar();
    const { nearbyStations } = useStation();
    const [nearbyStationList, setNearbyStationList] = useState(nearbyStations);
    const { getUserLocation } = useLocation();
    const [isLocationLoading, setIsLocationLoading] = useState(false);

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await getUser(showSnackbar);
            if (data?.user) {
                setUser(data.user);
            }
        };
        
        fetchUser();
    }, []);


    const searchBarRightComponent = (
        <Avatar.Image 
            source={{ uri: user?.avatar || 'https://avatar.iran.liara.run/public' }}
            size={45} 
            style={styles.avatar} 
        />
    );

    const navigateToMap = useCallback(async (getLocation = false) => {
        if(getLocation && !isLocationLoading) { // INFO: This will be skipped if we already have the location
            setIsLocationLoading(true);
            // Get the user location first
            try {
                getUserLocation();
                // Once we have the location, navigate to the map
                navigation.navigate('Map', {openKeyboard: false});
            } catch (error) {
                showSnackbar('Error getting location', 'error');
                // If the user denies the location permission, navigate to the map anyway with the keyboard open
                navigation.navigate('Map', {openKeyboard: true});
            }
            setIsLocationLoading(false);
        } else {
            navigation.navigate('Map', {openKeyboard: true});
        }
    }, [getUserLocation, navigation, showSnackbar]);


    const ethanolData = {
        price: 2.99,
        change: 0.05,
        changePercentage: 1.7,
        period: 'Last 7 days'
    };



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
                                items={getMenuItems(item, ['favorite', 'address'])} 
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

    const randomNum = Math.floor(Math.random() * 1000);

    const adsList = [`https://picsum.photos/seed/${randomNum}/300/200`, 
                        `https://picsum.photos/seed/${randomNum + 1}/300/200`, 
                        `https://picsum.photos/seed/${randomNum + 2}/300/200`, 
                        `https://picsum.photos/seed/${randomNum + 3}/300/200`, 
                        `https://picsum.photos/seed/${randomNum + 4}/300/200`];

    return (
        <View style={[styles.container, { alignItems: 'stretch' }]}>  

            <View style={[localStyles.headerView, {backgroundColor: theme.colors.onBackground}]}>
                {/* Header */}
                <List.Item
                    title={`Hi, ${user?.firstName|| 'there'}!`}
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
                        onLeftIconPress={() => navigateToMap(true)} // Open the map when the left icon is pressed
                        rightComponent={searchBarRightComponent}
                        onRightComponentPress={() => navigation.navigate('ProfileStack')}
                        onFocus={() => navigateToMap(false)} // Open the map when the search bar is focused
                        loading={isLocationLoading}
                        editable={!isLocationLoading}
                    />
                }
                </View>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.scrollView} style={{backgroundColor: theme.colors.background}} showsHorizontalScrollIndicator={false}>
                <View style={localStyles.contentContainer}>

                    {/* Ads carousel */}
                    <List.Section title='Promotions' style={[styles.listSection, styles.contentPaddingHorizontal]} titleStyle={[styles.listTitle, {color: theme.colors.outline} ]}>
                        <List.Item
                            title='Like what we do? A quick click on an ad helps a lot!'
                            titleNumberOfLines={5}
                            titleStyle={[localStyles.headerDescription, {color: theme.colors.outline}]}
                            left={() => <List.Icon icon="heart" color='red' style={{ paddingLeft: 15 }} />}
                            style={{paddingTop: 0, paddingBottom: 20}}
                        />
                        <AdsCarousel adsList={adsList} />
                    </List.Section>

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