import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import { useTheme as themeContext } from '../context/ThemeContext';
import { useTheme, Divider, Switch, List } from 'react-native-paper';
import { useState } from 'react';
import { openLink } from '../navigation/ExternalNavigation';

export default function SettingsScreen() {
    const styles = useGlobalStyles();
    const theme = useTheme();
    const { toggleTheme } = themeContext();

    const [profileSettings, setProfileSettings] = useState({
        notifications: {
            doNotDisturb: false,
        },
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollView} style={{backgroundColor: theme.colors.background}}>
            <View style={styles.container}>
                <List.Section title='Appearance' style={{...localStyles.listSection}} titleStyle={{...localStyles.listTitle, color: theme.colors.outline, ...localStyles.contentPaddingLeft}}>
                    <List.Item
                        title="Dark mode"
                        description={theme.dark === false ? `Off`: `On`}
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon={theme.dark === false ? 'brightness-5' : 'brightness-3'} color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <Switch {...props} value={theme.dark} onValueChange={toggleTheme} color={theme.colors.primary} style={localStyles.contentPaddingRight}/>}
                        subtitleStyle={{...localStyles.listDescription, color: theme.colors.outline }}
                    />
                </List.Section>

                <Divider/>

                <List.Section title='Notifications' style={{...localStyles.listSection}} titleStyle={{...localStyles.listTitle, color: theme.colors.outline, ...localStyles.contentPaddingLeft}}>
                    <List.Item
                        title="Do not disturb"
                        description={profileSettings.notifications.doNotDisturb === false ? `Off`: `On`}
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon={profileSettings.notifications.doNotDisturb === false ? 'bell' : 'bell-off'} color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <Switch {...props} value={profileSettings.notifications.doNotDisturb} onValueChange={() => setProfileSettings({ ...profileSettings, notifications: { doNotDisturb: !profileSettings.notifications.doNotDisturb } })} color={theme.colors.primary} style={localStyles.contentPaddingRight}/>}
                        subtitleStyle={{...localStyles.listDescription, color: theme.colors.outline }}
                    />
                </List.Section>

                <Divider/>

                <List.Section title='More' style={{...localStyles.listSection}} titleStyle={{...localStyles.listTitle, color: theme.colors.outline, ...localStyles.contentPaddingLeft}}>
                    <List.Item
                        title="Rate the app"
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon="star-outline" color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={localStyles.contentPaddingRight}/>}
                        onPress={() => openLink(Platform.select({ ios: 'https://apps.apple.com/us/app/ethanol-free-gas-locator-app', android: 'https://play.google.com/store/apps/details?id=com.ethanol-free-gas-locator-app' }))}
                    />

                    <List.Item
                        title="Visit the website"
                        titleStyle={{ ...localStyles.listTitle }}
                        left={props => <List.Icon {...props} icon="web" color={theme.colors.primary} style={localStyles.contentPaddingLeft} />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={localStyles.contentPaddingRight}/>}
                        onPress={() => openLink('https://ethanol-free-gas-locator.app')}
                    />
                </List.Section> 
            </View>
        </ScrollView>
    );
}

const localStyles = StyleSheet.create({

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
        paddingLeft: 30,
    },

    contentPaddingRight: {
        paddingRight: 20,
    },

    listSection: {
        width: '100%',
        marginTop: 20,
    },
});