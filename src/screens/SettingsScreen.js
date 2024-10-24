import { View, ScrollView, Platform } from 'react-native';
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
                <List.Section title='Appearance' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                    <List.Item
                        title="Dark mode"
                        description={theme.dark === false ? `Off`: `On`}
                        titleStyle={{ ...styles.listTitle }}
                        left={props => <List.Icon {...props} icon={theme.dark === false ? 'brightness-5' : 'brightness-3'} color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <Switch {...props} value={theme.dark} onValueChange={toggleTheme} color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                        subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
                    />
                </List.Section>

                <Divider style={styles.divider} />

                <List.Section title='Notifications' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                    <List.Item
                        title="Do not disturb"
                        description={profileSettings.notifications.doNotDisturb === false ? `Off`: `On`}
                        titleStyle={{ ...styles.listTitle }}
                        left={props => <List.Icon {...props} icon={profileSettings.notifications.doNotDisturb === false ? 'bell' : 'bell-off'} color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <Switch {...props} value={profileSettings.notifications.doNotDisturb} onValueChange={() => setProfileSettings({ ...profileSettings, notifications: { doNotDisturb: !profileSettings.notifications.doNotDisturb } })} color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                        subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
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
                        title="Visit the website"
                        titleStyle={{ ...styles.listTitle }}
                        left={props => <List.Icon {...props} icon="web" color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                        onPress={() => openLink('https://ethanol-free-gas-locator.app')}
                    />
                </List.Section> 
            </View>
        </ScrollView>
    );
}