import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const CarouselPagination = ({ 
  totalItems, 
  currentIndex, 
  maxDotsToShow = 5,
  onDotPress,
}) => {
  const theme = useTheme();

  if (!totalItems) return null;

  const renderDots = () => {
    let dots = [];
    
    if (totalItems <= maxDotsToShow) {
      // If there are less items than the maximum number of dots to show, show all the dots
      for (let i = 0; i < totalItems; i++) {
        dots.push(
          <TouchableOpacity
            key={i}
            onPress={() => onDotPress(i)}
          >
            <View style={[
              styles.dot,
              i === currentIndex && styles.activeDot,
              { backgroundColor: i === currentIndex ? theme.colors.primary : theme.colors.outline }
            ]} />
          </TouchableOpacity>
        );
      }
    } else {
      // Always show the first dot
      dots.push(
        <TouchableOpacity key="first" onPress={() => onDotPress(0)}>
          <View style={[
            styles.dot,
            currentIndex === 0 && styles.activeDot,
            { backgroundColor: currentIndex === 0 ? theme.colors.primary : theme.colors.outline }
          ]} />
        </TouchableOpacity>
      );

      // Dots at the beginning if necessary
      if (currentIndex > 2) {
        dots.push(
          <Text key="ellipsis1" style={[styles.ellipsis, { color: theme.colors.outline }]}>
            •••
          </Text>
        );
      }

      // Dots around the current index
      if (currentIndex > 1 && currentIndex < totalItems - 2) {
        dots.push(
          <TouchableOpacity key="prev" onPress={() => onDotPress(currentIndex - 1)}>
            <View style={[styles.dot, { backgroundColor: theme.colors.outline }]} />
          </TouchableOpacity>,
          <TouchableOpacity key="current" onPress={() => onDotPress(currentIndex)}>
            <View style={[styles.dot, styles.activeDot, { backgroundColor: theme.colors.primary }]} />
          </TouchableOpacity>,
          <TouchableOpacity key="next" onPress={() => onDotPress(currentIndex + 1)}>
            <View style={[styles.dot, { backgroundColor: theme.colors.outline }]} />
          </TouchableOpacity>
        );
      }

      // Dots at the end if necessary
      if (currentIndex < totalItems - 3) {
        dots.push(
          <Text key="ellipsis2" style={[styles.ellipsis, { color: theme.colors.outline }]}>
            •••
          </Text>
        );
      }

      // Always show the last dot
      dots.push(
        <TouchableOpacity key="last" onPress={() => onDotPress(totalItems - 1)}>
          <View style={[
            styles.dot,
            currentIndex === totalItems - 1 && styles.activeDot,
            { backgroundColor: currentIndex === totalItems - 1 ? theme.colors.primary : theme.colors.outline }
          ]} />
        </TouchableOpacity>
      );
    }

    return dots;
  };

  return (
    <View style={styles.container}>
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 24,
    height: 4,
    borderRadius: 2,
  },

  activeDot: {
    width: 24,
    height: 4,
    borderRadius: 2,
  },

  ellipsis: {
    fontSize: 12,
    letterSpacing: 2,
  }
});

export default CarouselPagination;