import { View, Text } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';

export default function StationDetails() {
    const styles = useGlobalStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.textColor}>Station Details</Text>
        </View>
    );
}