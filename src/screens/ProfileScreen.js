import { useGlobalStyles } from '../styles/globalStyles';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme, Button, List, Divider } from 'react-native-paper';
import ProfileCard from '../components/ProfileCard';
import { share } from '../navigation/ExternalNavigation';
import { openLink } from '../navigation/ExternalNavigation';

export default function ProfileScreen({ navigation }) {
    const styles = useGlobalStyles();
    const theme = useTheme();

    const user = { 
        firstName: 'Monkey D.',
        lastName: 'Luffy',
        email: 'monkey-d@one-piece.rock',
        avatar: 'https://i.pinimg.com/736x/1e/8b/f3/1e8bf3b2adefdfe76bb5dfe9bafe1ed5.jpg',
        bannerImage: 'https://i.pinimg.com/736x/53/1b/f2/531bf28ee274611ab3b887c9c301d88a.jpg',
        isPro: false,
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
                            onPress={() => navigation.navigate('Favorites')}
                        />
                        <List.Item
                            title="My search history"
                            titleStyle={{ ...styles.listTitle }}
                            left={props => <List.Icon {...props} icon="history" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                            onPress={() => navigation.navigate('History')}
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