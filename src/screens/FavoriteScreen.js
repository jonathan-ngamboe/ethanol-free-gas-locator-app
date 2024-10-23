import { View, Text } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';

export default function FavoriteScreen() {
    const styles = useGlobalStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Favorite Screen</Text>
        </View>
    );
}