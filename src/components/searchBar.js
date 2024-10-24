import { useGlobalStyles } from '../styles/globalStyles';
import { StyleSheet, Pressable } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import React, { useState } from 'react';

export default function SearchBar({ 
                            barRef,
                            leftIcon= 'map-marker', 
                            onLeftIconPress, 
                            rightComponent, 
                            onRightComponentPress, 
                            isLoading, 
                            onFocus,
                        }) {
    const styles = useGlobalStyles();
    const theme = useTheme();

    const RightComponent = () => (
        <Pressable onPress={onRightComponentPress}>
            {rightComponent}
        </Pressable>
    );

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Searchbar
            ref={barRef}
            placeholder="Search for a station"
            style={[ localStyles.searchBar, {backgroundColor: theme.colors.background}, styles.shadow ]}
            inputStyle={localStyles.searchInput}
            icon={leftIcon}
            iconColor={styles.textColor.color}
            onIconPress={onLeftIconPress}
            loading={isLoading}
            right={RightComponent}
            onFocus={onFocus}
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
        />
    );
}

const localStyles = StyleSheet.create({
    searchBar: {
        width: '90%',
        height: 45,
    },
    
    searchInput: {
        fontSize: 14,
        minHeight: 0, 
        paddingBottom: 0, 
        textAlignVertical: 'center', 
    },
});