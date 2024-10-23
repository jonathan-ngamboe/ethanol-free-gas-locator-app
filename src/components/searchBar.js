import { useGlobalStyles } from '../styles/globalStyles';
import { StyleSheet, Pressable } from 'react-native';
import { Searchbar, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchBar({navigation}) {
    const styles = useGlobalStyles();
    const theme = useTheme();

    const user = { 
        firstName: 'Monkey D.',
        lastName: 'Luffy',
        email: 'monkey-d@one-piece.rock',
        avatar: 'https://i.pinimg.com/736x/1e/8b/f3/1e8bf3b2adefdfe76bb5dfe9bafe1ed5.jpg',
    };

    const searchNearby = () => {
        console.log('Searching nearby');
    }

    const RightComponent = () => (
        <Pressable onPress={() => navigation.navigate('ProfileStack')}>
            <Avatar.Image 
                source={{ uri: user?.avatar || 'https://avatar.iran.liara.run/public' }}
                size={45} 
                style={styles.avatar} 
            />
        </Pressable>
    );

    return (
        <Searchbar
            placeholder="Search for a station"
            style={{ ...localStyles.searchBar, backgroundColor: theme.colors.background, borderColor: theme.colors.outline }}
            inputStyle={localStyles.searchInput}
            icon='map-marker'
            iconColor={styles.textColor.color}
            right={RightComponent}
            onIconPress={searchNearby}
        />
    );
}

const localStyles = StyleSheet.create({
    searchBar: {
        width: '90%',
        height: 45,
        borderWidth: StyleSheet.hairlineWidth,
    },
    searchInput: {
        fontSize: 14,
        minHeight: 0, 
        paddingBottom: 0, 
        textAlignVertical: 'center', 
    },
});