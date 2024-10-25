import { View, ScrollView, Platform } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import { useTheme as themeContext } from '../context/ThemeContext';
import { useTheme, Divider, Switch, List, RadioButton } from 'react-native-paper';
import { useState } from 'react';
import { openLink } from '../navigation/ExternalNavigation';

export default function SettingsScreen() {
    const styles = useGlobalStyles();
    const theme = useTheme();
    const { toggleTheme } = themeContext();

    const availableStartScreens = ['Home', 'Discover'];
    const [profileSettings, setProfileSettings] = useState({
        notifications: {
            push: true,
            email: true,
        },
        startScreen: 'Home'
    });

    return (
        <ScrollView contentContainerStyle={styles.scrollView} style={{backgroundColor: theme.colors.background}}>
            <View style={[styles.container, localStyles.mainView]}>
                {/* General */}
                <List.Section title='General' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                    <List.Accordion
                        title="Start screen"
                        description={profileSettings.startScreen}
                        titleStyle={{ ...styles.listTitle }}
                        left={props => <List.Icon {...props} color={theme.colors.primary} style={styles.contentPaddingLeft} icon={profileSettings.startScreen === 'Home' ? 'home' : 'map-search'} />}
                    >
                        <RadioButton.Group
                            onValueChange={value => setProfileSettings({ ...profileSettings, startScreen: value })}
                            value={profileSettings.startScreen}
                        >
                            {(availableStartScreens).map((item, index) => (
                                <RadioButton.Item
                                    key={index}
                                    label={item}
                                    labelStyle={styles.listTitle}
                                    value={item}
                                    color={theme.colors.primary}
                                    style={styles.contentPaddingLeft}
                                />
                            ))}

                        </RadioButton.Group>
                    </List.Accordion>

                    <Divider style={styles.divider} />
                </List.Section>

                {/* Appearance */}
                <List.Section title='Appearance' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                    <List.Item
                        title="Dark mode"
                        description={theme.dark === false ? `Off`: `On`}
                        titleStyle={{ ...styles.listTitle }}
                        left={props => <List.Icon {...props} icon={theme.dark === false ? 'brightness-5' : 'brightness-3'} color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <Switch {...props} value={theme.dark} onValueChange={toggleTheme} color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                        subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
                    />
                    <Divider style={styles.divider} />
                </List.Section>

                {/* Notifications */}
                <List.Section title='Notifications' style={{...styles.listSection}} titleStyle={{...styles.listTitle, color: theme.colors.outline, ...styles.contentPaddingLeft}}>
                    <List.Item
                        title="Push"
                        description={profileSettings.notifications.push === false ? `Off`: `On`}
                        titleStyle={{ ...styles.listTitle }}
                        left={props => <List.Icon {...props} icon={profileSettings.notifications.push === false ? 'bell-off' : 'bell'} color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <Switch {...props} value={profileSettings.notifications.push} onValueChange={() => setProfileSettings({ ...profileSettings, notifications: { ...profileSettings.notifications, push: !profileSettings.notifications.push } })} color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                        subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
                    />

                    <List.Item
                        title="Email"
                        description={profileSettings.notifications.email === false ? `Off`: `On`}
                        titleStyle={{ ...styles.listTitle }}
                        left={props => <List.Icon {...props} icon={profileSettings.notifications.email === false ? 'email-off' : 'email'} color={theme.colors.primary} style={styles.contentPaddingLeft} />}
                        right={(props) => <Switch {...props} value={profileSettings.notifications.email} onValueChange={() => setProfileSettings({ ...profileSettings, notifications: { ...profileSettings.notifications, email: !profileSettings.notifications.email } })} color={theme.colors.primary} style={styles.contentPaddingRight}/>}
                        subtitleStyle={{...styles.listDescription, color: theme.colors.outline }}
                    />
                    <Divider style={styles.divider} />
                </List.Section>

                {/* More */}
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

const localStyles = {
    mainView: {
        justifyContent: 'flex-start',
    },
};