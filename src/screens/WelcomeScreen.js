import { View } from "react-native"
import { useGlobalStyles } from "../styles/globalStyles"
import { Image, StyleSheet, Dimensions } from "react-native"
import { Text, Button } from "react-native-paper";
import { useTheme as themeContext } from '../context/ThemeContext';

const { width: screenWidth } = Dimensions.get("window");

export default function WelcomeScreen ( { navigation } ) {
    const styles = useGlobalStyles();
    const { theme } = themeContext();


    return (
        <View style={[styles.container, localStyles.container, styles.contentPaddingHorizontal]}>
            <Image
                source={require('../../assets/images/welcome-image.png')} 
                style={localStyles.image}
                resizeMode="stretch"
                alt="Illustration of a yellow fuel pump nozzle with a fuel drop."
                onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
            />
            <View style={localStyles.titleContainer}>
                <Text style={localStyles.title} variant="displayLarge">Find the </Text>
                <Text style={[localStyles.title, {color: theme.colors.primary}]}
                    variant="displayLarge"
                >
                    Closest 
                </Text>
                <Text style={localStyles.title} variant="displayLarge">Gas station</Text>
            </View>
            <View style={localStyles.subtitleContainer}>
                <Text style={[localStyles.subtitle, {color: theme.colors.outline}]} variant="headlineSmall">Ethanol stations at your fingertips. Explore your fueling options anywhere!</Text>
            </View>
            <Button
                mode="contained"
                style={localStyles.button}
                onPress={() => navigation.navigate('AuthScreen', { screen: 'Sign up' })}
                textColor="white"
            >
                Get started
            </Button>

        </View>
    )
}

const localStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexGrow: 1,
    },

    titleContainer: {
        alignSelf: 'flex-start',
    },

    title: {
        fontWeight: 'bold',
        textAlign: 'left',
    },

    subtitleContainer: {
        alignSelf: 'flex-start',
    },

    image: {
        width: screenWidth,  
        height: screenWidth * (540 / 680),
    },

    button: {
        marginTop: 20,
        alignSelf: 'flex-start',
    },

    themeSwitch: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
})
