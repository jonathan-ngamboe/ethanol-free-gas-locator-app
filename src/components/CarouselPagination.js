import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

const CarouselPagination = ({ totalItems, currentIndex, onPageChange, maxIndicators = 5 }) => {
  const theme = useTheme();

  if (totalItems <= 1) return null;

  const renderIndicators = () => {
    let indicators = [];
    const halfMax = Math.floor(maxIndicators / 2);

    if (totalItems <= maxIndicators) {
      // Show all indicators if there are less than the max
      for (let i = 0; i < totalItems; i++) {
        indicators.push(renderIndicator(i));
      }
    } else {
      // Always show the first indicator
      indicators.push(renderIndicator(0));

      if (currentIndex <= halfMax) {
        // Near the beginning
        for (let i = 1; i < maxIndicators - 1; i++) {
          indicators.push(renderIndicator(i));
        }
        indicators.push(renderEllipsis());
      } else if (currentIndex >= totalItems - halfMax - 1) {
        // Near the end
        indicators.push(renderEllipsis());
        for (let i = totalItems - maxIndicators + 1; i < totalItems - 1; i++) {
          indicators.push(renderIndicator(i));
        }
      } else {
        // Middle
        indicators.push(renderEllipsis());
        for (let i = currentIndex - 1; i <= currentIndex + 1; i++) {
          indicators.push(renderIndicator(i));
        }
        indicators.push(renderEllipsis());
      }

      // Always show the last indicator
      indicators.push(renderIndicator(totalItems - 1));
    }

    return indicators;
  };

  const renderIndicator = (index) => (
    <TouchableOpacity
      key={index}
      onPress={() => onPageChange(index)}
      style={[
        styles.indicator,
        index === currentIndex && styles.activeIndicator,
        { backgroundColor: index === currentIndex ? theme.colors.primary : theme.colors.outline }
      ]}
    />
  );

  const renderEllipsis = () => (
    <View key={`ellipsis-${Math.random()}`} style={styles.ellipsis}>
      <View style={[styles.ellipsisDot, { backgroundColor: theme.colors.outline }]} />
      <View style={[styles.ellipsisDot, { backgroundColor: theme.colors.outline }]} />
      <View style={[styles.ellipsisDot, { backgroundColor: theme.colors.outline }]} />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 16,
    height: 8,
    borderRadius: 4,
  },
  ellipsis: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  ellipsisDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
});

export default CarouselPagination;
