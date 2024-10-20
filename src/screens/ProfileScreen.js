import { View, Text } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

export default function ProfileScreen() {
    const currentTheme = lightTheme;

    return (
        <View style={globalStyles(currentTheme).container}>
            <Text>Profile Screen</Text>
        </View>
    );
}