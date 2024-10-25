import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useTheme, Title, List } from 'react-native-paper';

import StationCard from './StationCard';
import { openMap } from '../navigation/ExternalNavigation';
import { useGlobalStyles } from '../styles/globalStyles';

import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import CarouselPagination from './CarouselPagination';


export default function StationCarousel({ stationList, navigation }) {
    const width = Dimensions.get('window').width;
    const styles = useGlobalStyles();
    const theme = useTheme();
    
    // Create a ref for the carousel
    const ref = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Create a shared value for the carousel progress
    const progress = useSharedValue(0);

    const renderItem = ({ item, index }) => (
        <StationCard 
            station={item} 
            showShadow={false}
            onPressCard={() => navigation.navigate('StationDetails', { station: item })}
            onPressPrimaryButton={() => openMap({ destinationName: item.station_name, destinationLat: item.latitude, destinationLon: item.longitude })}
            onPressSecondaryButton={() => navigation.navigate('StationDetails', { station: item })}
            style={ localStyles.stationCard }
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
        <View style={[styles.container, localStyles.mainView]}>
            { stationList?.length > 0 && (
            <>
                <List.Item 
                    title="Stations"
                    titleStyle={styles.listTitle}
                    description="Swipe to see more stations"
                    descriptionStyle={styles.listDescription}
                    left={() => <List.Icon icon="arrow-left" color={theme.colors.primary} />}
                    right={() => <List.Icon icon="arrow-right" color={theme.colors.primary} />}
                    style={localStyles.header}
                />
                <View style={localStyles.carouselContainer}>
                    <Carousel
                        ref={ref}
                        loop={false}
                        width={width}
                        height="auto"
                        data={stationList}
                        scrollAnimationDuration={1000}
                        renderItem={renderItem}
                        onScrollEnd={(index) => {
                            setCurrentIndex(index);
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
        paddingRight: 0,
    },
    
    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        maxHeight: 220,
    }
});