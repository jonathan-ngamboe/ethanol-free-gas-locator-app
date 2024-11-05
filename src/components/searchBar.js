import { useGlobalStyles } from '../styles/globalStyles';
import { StyleSheet, Pressable } from 'react-native';
import { Searchbar, useTheme } from 'react-native-paper';
import React, { useState } from 'react';

export default function SearchBar({ 
                            barRef,
                            leftIcon='map-marker', 
                            onLeftIconPress, 
                            rightComponent, 
                            onRightComponentPress, 
                            loading, 
                            onFocus,
                            placeholder="Search",
                            searchQuery,
                            setSearchQuery,
                            onSubmit,
                            editable
                        }) {
    const styles = useGlobalStyles();
    const theme = useTheme();

    const RightComponent = () => (
        <Pressable onPress={onRightComponentPress}>
            {rightComponent}
        </Pressable>
    );

    return (
        <Searchbar
            ref={barRef}
            placeholder={placeholder}
            style={[ localStyles.searchBar, {backgroundColor: theme.colors.background}, styles.shadow ]}
            inputStyle={localStyles.searchInput}
            icon={leftIcon}
            iconColor={styles.textColor.color}
            onIconPress={onLeftIconPress}
            loading={loading}
            editable={editable}
            right={RightComponent}
            onFocus={onFocus}
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
            onSubmitEditing={onSubmit}
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
        alignSelf: 'auto'
    },
});