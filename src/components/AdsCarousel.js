import React, {useRef, useState, useCallback} from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import CarouselPagination from "./CarouselPagination";
import { useGlobalStyles } from "../styles/globalStyles";

export default function AdsCarousel({ adsList }) {
    const width = Dimensions.get('window').width;
    const styles = useGlobalStyles();
    const theme = useTheme();
    const ref = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ensure we have valid data
    const validData = Array.isArray(adsList) ? adsList : [];

    const renderItem = useCallback(({ item }) => (
        <View style={[styles.contentPaddingHorizontal]}>
            <Image
                source={{ uri: item }}
                style={localStyles.image}
                resizeMode="cover"
                onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
            />
        </View>
    ), [styles.contentPaddingHorizontal]);

    const handleDotPress = useCallback((index) => {
        if (ref.current) {
            ref.current.scrollTo({
                index: index,
                animated: true,
            });
        }
    }, []);

    // Only render if we have items
    if (validData.length === 0) {
        return null;
    }
    
    return (
        <View style={[styles.container, localStyles.mainView]}>
            <Carousel
                ref={ref}
                loop
                autoPlay={true}
                autoPlayInterval={5000}  // Increased for better UX
                width={width - 32}  // Account for horizontal padding
                height={200}
                data={validData}
                scrollAnimationDuration={1000}
                renderItem={renderItem}
                onProgressChange={(offsetProgress, absoluteProgress) => {
                    setCurrentIndex(Math.round(absoluteProgress));
                }}
                defaultIndex={0}
                mode="horizontal"
                enabled={true}  // Enable user interaction
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
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
        paddingHorizontal: 16,
    },

    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});