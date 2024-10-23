import { View, Text } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';

export default function HistoryScreen() {
    const styles = useGlobalStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>History Screen</Text>
        </View>
    );
}