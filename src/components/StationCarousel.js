import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useTheme, Title, List } from 'react-native-paper';

import StationCard from './StationCard';
import { openMap } from '../navigation/ExternalNavigation';
import { useGlobalStyles } from '../styles/globalStyles';

import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import CarouselPagination from './CarouselPagination';


export default function StationCarousel({ stationList, navigation, showShadow=false, containerStyle, cardColor, cardContainerStyle, headerStyle, showHeader=true }) {
    const width = Dimensions.get('window').width;
    const styles = useGlobalStyles();
    const theme = useTheme();
    
    // Create a ref for the carousel
    const ref = useRef(null);

    // Function to render the station count
    const renderStationCount = () => {
        if (stationList.length === 0) return 'No station found';
        if (stationList.length === 1) return '1 Station found';
        return `${stationList.length} Stations found`;
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    // Create a shared value for the carousel progress
    const progress = useSharedValue(0);

    const renderItem = ({ item, index }) => (
        <StationCard 
            station={item} 
            showShadow={showShadow}
            onPressCard={() => navigation.navigate('StationDetails', { station: item })}
            onPressPrimaryButton={() => openMap({ destinationName: item.station_name, destinationLat: item.latitude, destinationLon: item.longitude })}
            onPressSecondaryButton={() => navigation.navigate('StationDetails', { station: item })}
            cardContainerStyle={[ cardContainerStyle ]}
            cardColor={cardColor}
        />
    );

    const handleDotPress = (index) => {
        if (ref.current) {
            ref.current.scrollTo({
                index: index,
                animated: true,
            });
        }
    };

    return (
        <View style={[styles.container, localStyles.mainView, containerStyle]}>
            { stationList?.length > 0 && (
            <>
                { showHeader && (
                    <List.Item 
                        title={renderStationCount()}
                        titleStyle={styles.listTitle}
                        description={stationList?.length > 1 ? "Swipe to see more" : "Tap to see details"}
                        descriptionStyle={styles.listDescription}
                        left={() => <List.Icon icon="arrow-left" color={theme.colors.primary} />}
                        right={() => <List.Icon icon="arrow-right" color={theme.colors.primary} />}
                        style={[localStyles.header, headerStyle]}
                    />
                )}
                <View style={localStyles.carouselContainer}>
                    <Carousel
                        ref={ref}
                        loop={false}
                        width={width}
                        height="auto"
                        data={stationList}
                        scrollAnimationDuration={1000}
                        renderItem={renderItem}
                        onProgressChange={(offsetProgress, absoluteProgress) => {
                            setCurrentIndex(Math.round(absoluteProgress));
                        }}
                        defaultIndex={0}
                        mode="horizontal"
                    />
                </View>
                <CarouselPagination
                        totalItems={stationList.length}
                        currentIndex={currentIndex}
                        onDotPress={handleDotPress}
                        maxDotsToShow={5}
                    />
            </>
            )}
            { stationList?.length <= 0 && (
            <View style={localStyles.notFoundContainer}>
                <Title style={localStyles.title}>No stations found</Title>
            </View>
            )}
        </View>
    );
}

const localStyles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    notFoundContainer: {
        alignItems: 'center',
    },

    header: {
        paddingVertical: 0,
        paddingLeft: 20,
    },
    
    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        maxHeight: 220,
    }
});