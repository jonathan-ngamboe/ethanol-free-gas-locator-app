import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Searchbar, List } from 'react-native-paper';
import { useGlobalStyles } from '../styles/globalStyles';

export default function CardSearchList({navigation}) {
    const styles = useGlobalStyles();

    const stationList = [
        {
            id: '1',
            name: 'Shell',
            distance: 0.5,
        },
        {
            id: '2',
            name: 'Chevron',
            distance: 1.2,
        },
        {
            id: '3',
            name: 'Exxon',
            distance: 2.3,
        },
    ];

    return (
        <Card style={{...localStyles.card, ...styles.cardBackgroundColor}}>
            <Searchbar
                placeholder="Search near ethanol stations"
                inputStyle={localStyles.searchInput}
                style={{...localStyles.searchBar, ...styles.searchBar}}
                //onChangeText={setSearchQuery}
                //value={searchQuery}
            />
            <Card.Content>
                <FlatList
                    data={stationList}
                    renderItem={({item}) => (
                        <View style={localStyles.stationContainer}>
                            <List.Section>
                                <List.Item 
                                    title={item.name} 
                                    titleStyle={{fontWeight: 'bold'}}
                                    description={`${item.distance} miles away`}
                                    left={props => <List.Icon {...props} icon="gas-station" />}
                                    right={props => <List.Icon {...props} icon="dots-vertical" />}
                                />
                            </List.Section>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </Card.Content>     
        </Card>
    );
}

const localStyles = StyleSheet.create({
    card: {
        borderRadius: 20,
        width: '100%',
        elevation: 4, // For Android  
        shadowColor: '#000', // For iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,   
        paddingBottom: 10, 
    },

    searchBar: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        height: 36, 
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },

    searchInput: {
        fontSize: 14,
        minHeight: 0, 
        paddingBottom: 0, 
        textAlignVertical: 'center', 
    },

    stationContainer: {
        height: 60,
    },
});