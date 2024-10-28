import Auth from '../components/Auth';
//import Account from './components/Account'
import { StyleSheet, View, Text } from 'react-native'
import { useAuth } from '../context/AuthContext';
import { useGlobalStyles } from '../styles/globalStyles';


export default function AuthScreen() {
    const { session } = useAuth();
    const styles = useGlobalStyles();

    return (
        <View style={[styles.container, localStyles.container]}>
            <Auth />
            {session && session.user && <Text>{session.user.id}</Text>}
        </View>
    )
}

const localStyles = StyleSheet.create({
    container: {
        alignItems: 'stretch' 
    },
})