import React, { useRef, useState, useCallback } from "react";
import { View, Dimensions, StyleSheet, Image, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import CarouselPagination from "./CarouselPagination";
import { useGlobalStyles } from "../styles/globalStyles";
import { useSnackbar } from '../context/SnackbarContext';

export default function AdsCarousel({ adsList }) {
    const { width } = Dimensions.get('window');
    const styles = useGlobalStyles();
    const theme = useTheme();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { showSnackbar } = useSnackbar();

    const ITEM_WIDTH = width - 32; // Width of each item
    const ITEM_SPACING = 10; // Space between items

    // Ensure we have valid data
    const validData = Array.isArray(adsList) ? adsList : [];

    const renderItem = useCallback(({ item }) => (
        <View style={localStyles.itemContainer}>
            <Image
                source={{ uri: item }}
                style={localStyles.image}
                resizeMode="cover"
                onError={(e) => showSnackbar('Image loading error:', e.nativeEvent.error)}
            />
        </View>
    ), []);

    const handleDotPress = useCallback((index) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    }, []);

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, []);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    // Only render if we have items
    if (validData.length === 0) {
        return null;
    }
    
    return (
        <View style={[styles.container, localStyles.mainView]}>
            <FlatList
                ref={flatListRef}
                data={validData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                contentContainerStyle={localStyles.flatListContent}
                snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                decelerationRate="fast"
                getItemLayout={(data, index) => ({
                    length: ITEM_WIDTH + ITEM_SPACING,
                    offset: (ITEM_WIDTH + ITEM_SPACING) * index,
                    index,
                })}
            />
            <CarouselPagination
                totalItems={validData.length}
                currentIndex={currentIndex}
                onDotPress={handleDotPress}
                maxDotsToShow={5}
            />
        </View>
    );
}

const localStyles = StyleSheet.create({
    mainView: {
        width: '100%',
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
    },

    
    itemContainer: {
        width: Dimensions.get('window').width - 32,
        marginRight: 10, 
        paddingRight: 10,
    },

    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});