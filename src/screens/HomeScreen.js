import { View, Text } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';

export default function HomeScreen() {
    const styles = useGlobalStyles();
    
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}
