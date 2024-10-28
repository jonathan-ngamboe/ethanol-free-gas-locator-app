import { View } from "react-native"
import { useGlobalStyles } from "../styles/globalStyles"
import { Button } from "react-native-paper";


export default function WelcomeScreen ( { navigation } ) {
    const styles = useGlobalStyles();

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('AuthStack')}
            >
                Get Started
            </Button>
        </View>
    )
}