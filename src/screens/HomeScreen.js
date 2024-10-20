import { View, Text } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
    const currentTheme = lightTheme;

    return (
        <View style={globalStyles(currentTheme).container}>
            <Text>Home Screen</Text>
        </View>
    );
}
