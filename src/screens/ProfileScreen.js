import { useGlobalStyles } from '../styles/globalStyles';
import { View, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import { useTheme, Button, List, Divider, Text } from 'react-native-paper';
import ProfileCard from '../components/ProfileCard';
import { share } from '../navigation/ExternalNavigation';
import { openLink } from '../navigation/ExternalNavigation';
import { appStoreUrl, playStoreUrl, privacyPolicyUrl, bottomMessage, appVersion } from '../constants/generalConstants';
import { useAuth } from '../context/AuthContext';
import { getUser, deleteUser } from '../services/userService';
import { useSnackbar } from '../context/SnackbarContext';
import { useEffect, useState } from 'react';


export default function ProfileScreen({ navigation }) {
    const styles = useGlobalStyles();
    const theme = useTheme();
    const { signOut } = useAuth();
    const { showSnackbar } = useSnackbar();
    const [user, setUser] = useState(null);

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

    const exampleE85Station = {
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
    };

    const minimalE85Station = {
        id: 1520,
        fuel_type_code: "E85",
        station_name: "Quick E85",
        street_address: "123 Main St",
        city: "Springfield",
        state: "IL",
        status_code: "T",
        access_code: "public",
        latitude: 34.0453,
        longitude: -118.4441,
    };

    const logOut = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Log out',
                    onPress: () => signOut()
                }
            ]
        );
    };

    const deleteAccount = () => {
        Alert.alert(
            'Delete account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete account',
                    onPress: async () => {
                        const { error } = await deleteUser(showSnackbar);
                        if (!error) {
                            signOut();
                        }
                    }
                }
            ]
        );
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollView} style={{backgroundColor: theme.colors.background}}>
            <View style={localStyles.mainView}>
                <ProfileCard user={user} />

                <List.Section style={{ paddingHorizontal: 0 }}>
                    <List.Item
                        title={user?.firstName+ ' ' + user?.lastName}
                        description={user?.email}
                        left={props => <List.Icon {...props} icon="account-multiple-plus" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <Button {...props} icon="plus" mode="contained" textColor="white" onPress={() => share('Hey, Find the nearest E85 station with this app: ' + Platform.select({ ios: appStoreUrl, android: playStoreUrl }))}>Invite</Button>}
                        titleStyle={styles.listTitle}
                        titleVariant='bodySmall'
                        subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
                        subtitleVariant='bodySmall'
                    />
                    
                    {!user?.isPro && (
                        <List.Item
                                title="Upgrade to Premium"
                                titleStyle={{ ...styles.listTitle }}
                                left={props => <List.Icon {...props} icon="star" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                                right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                                onPress={() => console.log('Upgrade to Premium')}
                        />
                    )}

                    <Divider style={styles.divider} />

                    <List.Section title='Stations' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                        <List.Item
                            title="My favorite stations"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="heart" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => navigation.navigate('ListScreenStack', {
                                screen: 'List Screen',
                                params: {           
                                  stationList: user.favoriteStations, 
                                  pageTitle: 'Favorites',
                                  pageIcon: 'heart'
                                }
                              })}
                        />
                        <List.Item
                            title="My search history"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="history" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => navigation.navigate('ListScreenStack', {
                                screen: 'List Screen',  
                                params: {             
                                  stationList: user.searchHistory, 
                                  pageTitle: 'Search History',
                                  pageIcon: 'history'
                                }
                              })}
                        />
                    </List.Section>

                    <Divider style={styles.divider} />

                    <List.Section title='More' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                        <List.Item
                            title="Privacy policy"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="shield-account" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => openLink(privacyPolicyUrl)}
                        />

                        <List.Item
                            title="Rate the app"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="star-outline" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => openLink(Platform.select({ ios: appStoreUrl, android: playStoreUrl }))}
                        />
                        <List.Item
                            title="Logout"
                            titleStyle={{ ...styles.listTitle, color: theme.colors.outline }}
                            left={props => <List.Icon {...props} icon="logout" color={theme.colors.outline} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => logOut()}
                        />
                        <List.Item
                            title="Delete account"
                            titleStyle={{ ...styles.listTitle, color: theme.colors.error }}
                            left={props => <List.Icon {...props} icon="delete" color={theme.colors.error} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight} />}
                            onPress={() => deleteAccount()}
                        />  

                        <List.Item
                            title="Version"
                            description={appVersion}
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="information" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
                        />

                        <Text style={[localStyles.bottomMessage, {color: theme.colors.outline}]}>{bottomMessage}</Text>
                    </List.Section>
  
                </List.Section>
            </View>
        </ScrollView>
    );
}

const localStyles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: '100%',
    },

    bottomMessage: {
        textAlign: 'center',
        marginTop: 20,
    },
});