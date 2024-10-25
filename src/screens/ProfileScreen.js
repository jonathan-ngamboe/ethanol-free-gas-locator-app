import { useGlobalStyles } from '../styles/globalStyles';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme, Button, List, Divider } from 'react-native-paper';
import ProfileCard from '../components/ProfileCard';
import { share } from '../navigation/ExternalNavigation';
import { openLink } from '../navigation/ExternalNavigation';

export default function ProfileScreen({ navigation }) {
    const styles = useGlobalStyles();
    const theme = useTheme();

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

    const user = { 
        firstName: 'Monkey D.',
        lastName: 'Luffy',
        email: 'monkey-d@one-piece.rock',
        avatar: 'https://i.pinimg.com/736x/1e/8b/f3/1e8bf3b2adefdfe76bb5dfe9bafe1ed5.jpg',
        bannerImage: 'https://i.pinimg.com/736x/53/1b/f2/531bf28ee274611ab3b887c9c301d88a.jpg',
        isPro: false,
        favoriteStations: [exampleE85Station],
        searchHistory: [minimalE85Station, exampleE85Station ],
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView} style={{backgroundColor: theme.colors.background}}>
            <View style={localStyles.mainView}>
                <ProfileCard user={user} />

                <List.Section style={{ paddingHorizontal: 0 }}>
                    <List.Item
                        title={user.firstName + ' ' + user.lastName}
                        description={user.email}
                        left={props => <List.Icon {...props} icon="account-multiple-plus" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <Button {...props} icon="plus" mode="contained" textColor={theme.colors.background} onPress={() => share('Hey, Join me on this app!')}>Invite</Button>}
                        titleStyle={styles.listTitle}
                        titleVariant='bodySmall'
                        subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
                        subtitleVariant='bodySmall'
                    />

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
                            title="Rate the app"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="star-outline" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => openLink(Platform.select({ ios: 'https://apps.apple.com/us/app/ethanol-free-gas-locator-app', android: 'https://play.google.com/store/apps/details?id=com.ethanol-free-gas-locator-app' }))}
                        />
                        <List.Item
                            title="Logout"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="logout" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => console.log('Logout')}
                        />
                        <List.Item
                            title="Delete account"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="delete" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight} />}
                            onPress={() => console.log('Delete account')}
                        />  
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
});