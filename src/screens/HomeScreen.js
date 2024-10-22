import { View, StyleSheet, Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { useGlobalStyles } from '../styles/globalStyles';


export default function HomeScreen({navigation}) {
    const styles = useGlobalStyles();
    const user = { 
        firstName: 'John', 
        lastName: 'Doe',
        email: 'john@example.com',
        isPro: false,
    };

    return (
        <View style={ styles.container }>
            <Card.Title
                title="👋 Welcome"
                titleVariant="titleMedium"
                style={{...localStyles.cardTitle, ...styles.cardBackgroundColor}}
                titleStyle={{...localStyles.titleCard, ...styles.cardTitle}}
                right={(props) =>   <Pressable onPress={() => navigation.navigate('Profile')} > 
                                        <Avatar.Image 
                                            source={{ uri: user?.avatar ? user.avatar : `https://avatar.iran.liara.run/public` }}
                                            {...props} 
                                            size={45} 
                                            onPress={() => navigation.navigate('Profile')} 
                                            style={styles.avatar} 
                                        />
                                    </Pressable>
                }
            />
        </View>
    );
}

const localStyles = StyleSheet.create({
    cardTitle: {
        position: 'absolute',
        top: 0,
        marginTop: 16,
        borderRadius: 45,
        minHeight: 45, 
    },

    titleCard: {
        position: 'absolute',
    },
});