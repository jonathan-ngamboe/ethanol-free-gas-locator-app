import React, { useState, useRef, useCallback, useEffect } from "react";
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
    selectedIndex = 0,
}) {
    const styles = useGlobalStyles();
    const theme = useTheme();
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);
    const previousSelectedIndexRef = useRef(selectedIndex);
    const [isScrolling, setIsScrolling] = useState(false);

    // Memoize the StationCard component to prevent unnecessary re-renders
    const MemoizedStationCard = React.memo(StationCard);

    const renderStationCount = () => {
        if (stationList.length === 0) return 'No station found';
        if (stationList.length === 1) return '1 Station found';
        return `${currentIndex + 1} of ${stationList.length} Stations`;
    };

    const renderItem = useCallback(({ item }) => (
        <View style={localStyles.itemContainer}>
            <MemoizedStationCard  
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

    const scrollToIndex = useCallback((index) => {
        if (flatListRef.current && index >= 0 && index < stationList.length && !isScrolling) {
            setIsScrolling(true);
            
            flatListRef.current.scrollToIndex({
                index,
                animated: true,
                viewOffset: 0,
                viewPosition: 0
            });

            setCurrentIndex(index);
            
            // Reset isScrolling after animation
            setTimeout(() => {
                setIsScrolling(false);
            }, 300);
        }
    }, [stationList.length, isScrolling]);

    const handleScroll = useCallback((event) => {
        if (!isScrolling) {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / ITEM_WIDTH);
            if (index !== currentIndex) {
                setCurrentIndex(index);
            }
        }
    }, [currentIndex, isScrolling]);

    const handleMomentumScrollEnd = useCallback(() => {
        setIsScrolling(false);
    }, []);

    const handleDotPress = useCallback((index) => {
        if (!isScrolling) {
            scrollToIndex(index);
        }
    }, [scrollToIndex, isScrolling]);

    const goToNextItem = useCallback(() => {
        if (currentIndex < stationList.length - 1 && !isScrolling) {
            scrollToIndex(currentIndex + 1);
        }
    }, [currentIndex, stationList.length, scrollToIndex, isScrolling]);
    
    const goToPreviousItem = useCallback(() => {
        if (currentIndex > 0 && !isScrolling) {
            scrollToIndex(currentIndex - 1);
        }
    }, [currentIndex, scrollToIndex, isScrolling]);

    // Scroll to selected index when selectedIndex changes
    useEffect(() => {
        if (selectedIndex !== previousSelectedIndexRef.current) {
            scrollToIndex(selectedIndex);
            previousSelectedIndexRef.current = selectedIndex;
        }
    }, [selectedIndex, scrollToIndex]);

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
                            disabled={isScrolling || currentIndex === 0 || stationList.length === 1 || !currentIndex}
                        /> 
                    )}
                    right={() => stationList?.length > 1 && ( 
                        <IconButton
                            icon="arrow-right" 
                            iconColor={theme.colors.primary}
                            onPress={goToNextItem}
                            size={24}
                            style={{ opacity: currentIndex === stationList.length - 1 ? 0.5 : 1 }}
                            disabled={isScrolling || currentIndex === stationList.length - 1 || stationList.length === 1 }
                        />)}
                    style={[localStyles.header, headerStyle, { backgroundColor: theme.colors.background }]}
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
                onMomentumScrollEnd={handleMomentumScrollEnd}
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