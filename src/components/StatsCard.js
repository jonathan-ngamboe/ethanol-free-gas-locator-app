import React from "react";
import { View, StyleSheet } from "react-native";
import { useGlobalStyles } from "../styles/globalStyles";
import { Text, useTheme } from 'react-native-paper';

export default StatsCard = ({
  // Main value props
  value = '0',
  prefix = '$',
  
  // Change indicator props
  change = '0',
  changePercentage = '0',
  showChange = true,
  
  // Header props
  title = '',
  subtitle = '',
  showHeader = true,
  
  // Time period props
  period = '',
  showPeriod = true,
  
  // Style props
  containerStyle = {},
  valueStyle = {},
  changeStyle = {},
  periodStyle = {},
  subtitleStyle = {},
  titleStyle = {},
  
  // Color props
  positiveColor = '#4CAF50',
  negativeColor = '#F44336',
  cardColor = '#FFFFFF',
  
  // Custom formatting
  formatValue = (val) => val,
  formatChange = (val) => val,
  formatPercentage = (val) => val,
}) => {
  const theme = useTheme();
  const styles = useGlobalStyles();
  
  const isPositive = parseFloat(change) >= 0;
  const changeColor = isPositive ? positiveColor : negativeColor;
  
  const formattedValue = formatValue(value);
  const formattedChange = formatChange(change);
  const formattedPercentage = formatPercentage(changePercentage);

  return (
    <View style={[localStyles.container, {backgroundColor: cardColor}]}>
      {showHeader && (
        <View style={localStyles.header}>
          <Text variant="titleMedium" style={[localStyles.title, titleStyle]}>{title}</Text>
          {subtitle && <Text variant="bodyMedium" style={[localStyles.subtitle, subtitleStyle]}>{subtitle}</Text>}
        </View>
      )}
      
      {showPeriod && (
        <Text variant="bodyMedium" style={[localStyles.period, periodStyle]}>
          {period}
        </Text>
      )}
      
      <Text variant="headlineLarge" style={[localStyles.value, valueStyle]}>
        {prefix}{formattedValue}
      </Text>
      
      {showChange && (
        <View style={localStyles.changeContainer}>
          <Text style={[localStyles.change, { color: changeColor }, changeStyle]}>
            {isPositive ? '+' : ''}{formattedChange}
          </Text>
          <Text style={[localStyles.change, { color: changeColor }, changeStyle]}>
            {isPositive ? '+' : ''}{formattedPercentage}%
          </Text>
        </View>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  subtitle: {
    marginLeft: 8,
    opacity: 0.7,
  },

  period: {
    marginBottom: 8,
    opacity: 0.7,
  },

  value: {
    fontWeight: '700',
    marginBottom: 8,
  },

  changeContainer: {
    flexDirection: 'row',
    gap: 16,
  },

  change: {
    fontWeight: '500',
  },
});