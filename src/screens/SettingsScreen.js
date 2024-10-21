import { View } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import { useTheme } from '../context/ThemeContext';
import { Button } from 'react-native';

export default function SettingsScreen() {
    const styles = useGlobalStyles();
    const { toggleTheme } = useTheme();

    return (
        <View style={styles.container}>
            <Button 
                title="Toggle Theme"
                onPress={toggleTheme}
            />
        </View>
    );
}