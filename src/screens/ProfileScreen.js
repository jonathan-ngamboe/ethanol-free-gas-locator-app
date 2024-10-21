import { View, Text } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';

export default function ProfileScreen() {
    const styles = useGlobalStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.textColor}>Profile Screen</Text>
        </View>
    );
}