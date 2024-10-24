import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useTheme, Title, List } from 'react-native-paper';

import StationCard from './StationCard';
import { openMap } from '../navigation/ExternalNavigation';
import { useGlobalStyles } from '../styles/globalStyles';

import Carousel, { Pagination, } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";


export default function StationCarousel({ stationList, navigation }) {
    const width = Dimensions.get('window').width;
    const styles = useGlobalStyles();
    const theme = useTheme();
    
    // Create a ref for the carousel
    const ref = React.useRef(null);
    // Create a shared value for the carousel progress
    const progress = useSharedValue(0);

    // Prepare the data for the pagination
    const data = new Array(stationList?.length).fill(0);

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

    const onPressPagination = (index) => {
        // Scroll to the selected index
        if (ref.current) {
            ref.current.scrollTo({
                count: index - Math.round(progress.value),
                animated: false,
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
                        height={'auto'}
                        data={stationList ? stationList : []}
                        scrollAnimationDuration={1000}
                        renderItem={renderItem}
                        onProgressChange={(offsetProgress, absoluteProgress) => {
                            progress.value = Math.round(absoluteProgress);
                        }}
                        mode="horizontal"
                    />
                </View>
                <Pagination.Basic 
                    progress={progress}
                    data={data}
                    onPress={onPressPagination}
                    dotStyle={{ backgroundColor: theme.colors.outline, ...localStyles.paginationDot }}
                    activeDotStyle={{ backgroundColor: theme.colors.primary, ...localStyles.paginationActiveDot }}
                    containerStyle={localStyles.paginationContainer}
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
    },

    carouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        maxHeight: 220,
    },

    paginationContainer: {
        justifyContent: 'center',
        gap: 10, 
        marginBottom: 20,
    },
    
    paginationDot: {
        width: 20,
        height: 4,
        borderRadius: 2,
    },
    
    paginationActiveDot: {
        width: 20,
        height: 4,
        borderRadius: 2,
    },

});
