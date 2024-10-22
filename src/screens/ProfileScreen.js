import { useGlobalStyles } from '../styles/globalStyles';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme, Button, Switch, List } from 'react-native-paper';
import ProfileCard from '../components/ProfileCard';
import { share } from '../navigation/ExternalNavigation';
import { openLink } from '../navigation/ExternalNavigation';

export default function ProfileScreen() {
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
                        left={props => <List.Icon {...props} icon="account-multiple-plus" color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <Button {...props} icon="plus" mode="contained" onPress={() => share('Hey, Join me on this app!')}>Invite</Button>}
                        titleStyle={localStyles.listTitle}
                        titleVariant='bodySmall'
                        subtitleStyle={{...localStyles.listDescription, color: theme.colors.outline }}
                        subtitleVariant='bodySmall'
                    />

                    <List.Item
                        title="Favorites"
                        titleStyle={{ ...localStyles.listTitle, color: theme.colors.outline }}
                        style={{ ...localStyles.contentPaddingLeft, paddingBottom: 0 }}
                    />

                    <List.Item
                        title="My favorite stations"
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon="heart" color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={localStyles.contentPaddingRight}/>}
                        onPress={() => console.log('My favorite stations')}
                    />

                    <List.Item
                        title="More"
                        titleStyle={{ ...localStyles.listTitle, color: theme.colors.outline }}
                        style={{ ...localStyles.contentPaddingLeft, paddingBottom: 0 }}
                    />

                    <List.Item
                        title="Rate the app"
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon="star-outline" color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={localStyles.contentPaddingRight}/>}
                        onPress={() => openLink(Platform.select({ ios: 'https://apps.apple.com/us/app/ethanol-free-gas-locator-app', android: 'https://play.google.com/store/apps/details?id=com.ethanol-free-gas-locator-app' }))}
                    />
                    <List.Item
                        title="Logout"
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon="logout" color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={localStyles.contentPaddingRight}/>}
                        onPress={() => console.log('Logout')}
                    />
                    <List.Item
                        title="Delete account"
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon="delete" color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={localStyles.contentPaddingRight} />}
                        onPress={() => console.log('Delete account')}
                    />    
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

    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 0,
    },

    listDescription: {
        fontSize: 14,
        lineHeight: 0,
    },

    contentPaddingLeft: {
        paddingLeft: 20,
    },

    contentPaddingRight: {
        paddingRight: 20,
    },
});