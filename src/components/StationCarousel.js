import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { useTheme, IconButton, List } from 'react-native-paper';

import StationCard from './StationCard';
import { openMap } from '../navigation/ExternalNavigation';
import { useGlobalStyles } from '../styles/globalStyles';
import CarouselPagination from './CarouselPagination';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_PADDING = 10;
const ITEM_WIDTH = SCREEN_WIDTH - (CONTAINER_PADDING * 2);

export default function StationCarousel({ 
    stationList, 
    navigation, 
    showShadow=false, 
    containerStyle, 
    cardColor, 
    cardContainerStyle, 
    headerStyle, 
    showHeader=true,
    loading=false,
}) {
    const styles = useGlobalStyles();
    const theme = useTheme();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderStationCount = () => {
        if (stationList.length === 0) return 'No station found';
        if (stationList.length === 1) return '1 Station found';
        // Show the station index and total count
        return `${currentIndex + 1} of ${stationList.length} Stations`;
    };

    const renderItem = useCallback(({ item }) => (
        <View style={localStyles.itemContainer}>
            <StationCard  
                station={item} 
                showShadow={showShadow}
                onPressCard={() => navigation.navigate('StationDetails', { station: item })}
                onPressPrimaryButton={() => openMap({ 
                    destinationName: item.station_name, 
                    destinationLat: item.latitude, 
                    destinationLon: item.longitude 
                })}
                onPressSecondaryButton={() => navigation.navigate('StationDetails', { station: item })}
                cardContainerStyle={[localStyles.card, cardContainerStyle]}
                cardColor={cardColor}
            />
        </View>
    ), [navigation, showShadow, cardContainerStyle, cardColor]);

    const handleScroll = useCallback((event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / ITEM_WIDTH);
        setCurrentIndex(index);
    }, []);

    const handleDotPress = useCallback((index) => {
        flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewOffset: 0,
            viewPosition: 0
        });
    }, []);

    const goToNextItem = useCallback(() => {
        if (currentIndex < stationList.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true
            });
        }
    }, [currentIndex, stationList.length]);
    
    const goToPreviousItem = useCallback(() => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex - 1,
                animated: true
            });
        }
    }, [currentIndex]);

    return (
        <View style={[localStyles.mainContainer, containerStyle]}>
            {showHeader && (
                <List.Item 
                    title={renderStationCount()}
                    titleStyle={styles.listTitle}
                    description={stationList?.length > 1 ? "Swipe to see more" : ""}
                    descriptionStyle={styles.listDescription}
                    left={() => stationList?.length > 1 && ( 
                        <IconButton
                            icon="arrow-left" 
                            iconColor={theme.colors.primary}
                            onPress={goToPreviousItem}
                            size={24}
                            style={{ opacity: currentIndex === 0 ? 0.5 : 1 }}
                        /> 
                    )}
                    right={() => stationList?.length > 1 && ( 
                        <IconButton
                            icon="arrow-right" 
                            iconColor={theme.colors.primary}
                            onPress={goToNextItem}
                            size={24}
                            style={{ opacity: currentIndex === stationList.length - 1 ? 0.5 : 1 }}
                        />)}
                    style={[localStyles.header, headerStyle]}
                />
            )}
            
            <FlatList
                ref={flatListRef}
                data={stationList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH}
                snapToAlignment="center"
                decelerationRate="fast"
                onScroll={handleScroll}
                contentContainerStyle={localStyles.flatListContent}
                getItemLayout={(_, index) => ({
                    length: ITEM_WIDTH,
                    offset: ITEM_WIDTH * index,
                    index,
                })}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                refreshing={loading}
            />
            
            <CarouselPagination
                totalItems={stationList.length}
                currentIndex={currentIndex}
                onDotPress={handleDotPress}
                maxDotsToShow={5}
            />
        </View>
    );
}

const localStyles = StyleSheet.create({
    mainContainer: {
        width: SCREEN_WIDTH,
        backgroundColor: 'transparent',
    },

    itemContainer: {
        width: ITEM_WIDTH,
        paddingHorizontal: CONTAINER_PADDING,
    },
    
    card: {
        width: '100%',
    },

    header: {
        paddingVertical: 0,
        paddingHorizontal: CONTAINER_PADDING,
    },

    notFoundContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: CONTAINER_PADDING,
    },
});
