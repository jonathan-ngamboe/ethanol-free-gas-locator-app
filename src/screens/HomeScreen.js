import { View, StyleSheet } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import SearchBar from '../components/SearchBar';
import { Avatar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native'; 


export default function HomeScreen({navigation}) {
    const styles = useGlobalStyles();

    const isFocused = useIsFocused();

    const user = { 
        firstName: 'Monkey D.',
        lastName: 'Luffy',
        email: 'monkey-d@one-piece.rock',
        avatar: 'https://i.pinimg.com/736x/1e/8b/f3/1e8bf3b2adefdfe76bb5dfe9bafe1ed5.jpg',
    };

    const searchBarRightComponent = (
        <Avatar.Image 
            source={{ uri: user?.avatar || 'https://avatar.iran.liara.run/public' }}
            size={45} 
            style={styles.avatar} 
        />
    );

    const navigateToMap = () => {
        navigation.navigate('Map', { 
            openKeyboard: true 
        });
    };
    return (
        <View style={ styles.container }>
            <View style={localStyles.searchBarContainer}>
                {isFocused && 
                    <SearchBar
                        leftIcon='map-marker'
                        onLeftIconPress={navigateToMap} // Open the map when the left icon is pressed and get the user's location (TODO)
                        rightComponent={searchBarRightComponent}
                        onRightComponentPress={() => navigation.navigate('ProfileStack')}
                        onFocus={navigateToMap} // Open the map when the search bar is focused
                        />
                }
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    searchBarContainer: {
        position: 'absolute',
        top: 15,  
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1, 
    },
});