import { View, StyleSheet } from 'react-native';
import { useGlobalStyles } from '../styles/globalStyles';
import SearchBar from '../components/searchBar';


export default function HomeScreen({navigation}) {
    const styles = useGlobalStyles();

    return (
        <View style={ styles.container }>
            <View style={localStyles.searchBarContainer}>
                    <SearchBar navigation={navigation}/>
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