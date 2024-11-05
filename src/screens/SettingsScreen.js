import { View, ScrollView, Platform } from "react-native";
import { useGlobalStyles } from "../styles/globalStyles";
import { useTheme as themeContext } from "../context/ThemeContext";
import {
  useTheme,
  Divider,
  Switch,
  List,
  RadioButton,
  Text,
} from "react-native-paper";
import { useState } from "react";
import { openLink } from "../navigation/ExternalNavigation";
import { storeData, loadData } from "../utils/asyncStorage";
import { useEffect } from "react";
import { settingsConstants } from "../constants/storageConstants";
import {
  helpUrl,
  appStoreUrl,
  playStoreUrl,
  websiteUrl,
  bottomMessage,
  appVersion,
} from "../constants/generalConstants";

export default function SettingsScreen() {
  const styles = useGlobalStyles();
  const theme = useTheme();
  const { setTheme } = themeContext();

  const availableStartScreens = ["Home", "Discover"];

  // Settings
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
    },
    startScreen: "Discover",
    theme: theme.dark === false ? "light" : "dark",
  });

  // Load settings
  useEffect(() => {
    const fetchSettings = async () => {
      const loadedSettings = await loadData(settingsConstants.SETTINGS_KEY);
      setSettings(loadedSettings || settings);

      // Set the theme
      setTheme(loadedSettings.theme);
    };
    fetchSettings();
  }, []);

  // Save settings after any change
  useEffect(() => {
    const storeSettings = async () => {
      storeData(settingsConstants.SETTINGS_KEY, settings);
    };
    storeSettings();
  }, [settings]);

  // Theme settings
  const toggleTheme = () => {
    let newTheme = settings.theme === "light" ? "dark" : "light";
    setSettings({ ...settings, theme: newTheme });
    setTheme(newTheme);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      style={{ backgroundColor: theme.colors.background }}
    >
      <View style={[styles.container, localStyles.mainView]}>
        {/* General */}
        <List.Section
          title="General"
          style={{ ...styles.listSection }}
          titleStyle={{
            ...styles.listTitle,
            color: theme.colors.outline,
            ...styles.contentPaddingLeft,
          }}
        >
          <List.Accordion
            title="Start screen"
            description={settings?.startScreen}
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
                icon={settings?.startScreen === "Home" ? "home" : "map-search"}
              />
            )}
          >
            <RadioButton.Group
              onValueChange={(value) =>
                setSettings({ ...settings, startScreen: value })
              }
              value={settings?.startScreen}
            >
              {availableStartScreens.map((item, index) => (
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
        <List.Section
          title="Appearance"
          style={{ ...styles.listSection }}
          titleStyle={{
            ...styles.listTitle,
            color: theme.colors.outline,
            ...styles.contentPaddingLeft,
          }}
        >
          <List.Item
            title="Dark mode"
            description={theme.dark === false ? `Off` : `On`}
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                icon={theme.dark === false ? "brightness-5" : "brightness-3"}
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
              />
            )}
            right={(props) => (
              <Switch
                {...props}
                value={theme.dark}
                onValueChange={toggleTheme}
                color={theme.colors.primary}
                style={styles.contentPaddingRight}
              />
            )}
            subtitleStyle={{
              ...styles.listDescription,
              color: theme.colors.outline,
            }}
          />
          <Divider style={styles.divider} />
        </List.Section>

        {/* Notifications */}
        <List.Section
          title="Notifications"
          style={{ ...styles.listSection }}
          titleStyle={{
            ...styles.listTitle,
            color: theme.colors.outline,
            ...styles.contentPaddingLeft,
          }}
        >
          <List.Item
            title="Push"
            description={settings?.notifications?.push === false ? `Off` : `On`}
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                icon={
                  settings?.notifications?.push === false ? "bell-off" : "bell"
                }
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
              />
            )}
            right={(props) => (
              <Switch
                {...props}
                value={settings?.notifications?.push}
                onValueChange={() =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      push: !settings?.notifications?.push,
                    },
                  })
                }
                color={theme.colors.primary}
                style={styles.contentPaddingRight}
              />
            )}
            subtitleStyle={{
              ...styles.listDescription,
              color: theme.colors.outline,
            }}
          />

          <List.Item
            title="Email"
            description={
              settings?.notifications?.email === false ? `Off` : `On`
            }
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                icon={
                  settings?.notifications?.email === false
                    ? "email-off"
                    : "email"
                }
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
              />
            )}
            right={(props) => (
              <Switch
                {...props}
                value={settings?.notifications?.email}
                onValueChange={() =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      email: !settings?.notifications?.email,
                    },
                  })
                }
                color={theme.colors.primary}
                style={styles.contentPaddingRight}
              />
            )}
            subtitleStyle={{
              ...styles.listDescription,
              color: theme.colors.outline,
            }}
          />
          <Divider style={styles.divider} />
        </List.Section>

        {/* More */}
        <List.Section
          title="More"
          style={{ ...styles.listSection }}
          titleStyle={{
            ...styles.listTitle,
            color: theme.colors.outline,
            ...styles.contentPaddingLeft,
          }}
        >
          <List.Item
            title="Help"
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                icon="help-circle"
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
              />
            )}
            right={(props) => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={theme.colors.primary}
                style={styles.contentPaddingRight}
              />
            )}
            onPress={() => openLink(helpUrl)}
          />

          <List.Item
            title="Rate the app"
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                icon="star-outline"
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
              />
            )}
            right={(props) => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={theme.colors.primary}
                style={styles.contentPaddingRight}
              />
            )}
            onPress={() =>
              openLink(
                Platform.select({ ios: appStoreUrl, android: playStoreUrl })
              )
            }
          />

          <List.Item
            title="Visit the website"
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                icon="web"
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
              />
            )}
            right={(props) => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={theme.colors.primary}
                style={styles.contentPaddingRight}
              />
            )}
            onPress={() => openLink(websiteUrl)}
          />

          <List.Item
            title="Version"
            description={appVersion}
            titleStyle={{ ...styles.listTitle }}
            left={(props) => (
              <List.Icon
                {...props}
                icon="information"
                color={theme.colors.primary}
                style={styles.contentPaddingLeft}
              />
            )}
            subtitleStyle={{
              ...styles.listDescription,
              color: theme.colors.outline,
            }}
          />

          <Text
            style={[localStyles.bottomMessage, { color: theme.colors.outline }]}
          >
            {bottomMessage}
          </Text>
        </List.Section>
      </View>
    </ScrollView>
  );
}

const localStyles = {
  mainView: {
    justifyContent: "flex-start",
  },

  bottomMessage: {
    textAlign: "center",
    marginTop: 20,
  },
};
