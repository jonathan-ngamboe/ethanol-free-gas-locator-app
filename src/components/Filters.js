import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useGlobalStyles } from "../styles/globalStyles";
import { List, useTheme, Divider, SegmentedButtons, Button, Chip } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export default function Filters({ closeFilters, viewMode, setViewMode, setFiltersData }) {
    const theme = useTheme();
    const styles = useGlobalStyles();

    // Initial filters state
    const [filters, setFilters] = useState({
        viewMode: viewMode,
        sortBy: 'nearest',
        status: [],
        paymentMethods: [],
        accessType: [],
        ethanolBlends: [],
        hasBlenderPump: false
    });

    // Available payment methods based on station details
    const paymentMethods = [
        { id: 'V', label: 'Visa', icon: 'credit-card' },
        { id: 'M', label: 'MasterCard', icon: 'credit-card' },
        { id: 'D', label: 'Discover', icon: 'credit-card' },
        { id: 'A', label: 'AmEx', icon: 'credit-card' },
        { id: 'CREDIT', label: 'Credit', icon: 'credit-card' },
        { id: 'DEBIT', label: 'Debit', icon: 'credit-card' },
        { id: 'CASH', label: 'Cash', icon: 'cash' }
    ];

    // Status options
    const statusOptions = [
        { id: 'E', label: 'Available', icon: 'check-circle' },
        { id: 'P', label: 'Planned', icon: 'clock-outline' },
        { id: 'T', label: 'Unavailable', icon: 'alert-circle' }
    ];

    // Access types
    const accessTypes = [
        { id: 'public', label: 'Public', icon: 'account-group-outline' },
        { id: 'private', label: 'Private', icon: 'lock' }
    ];

    const toggleFilter = (category, value) => {
        setFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    const toggleBooleanFilter = (category) => {
        setFilters(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const applyFilters = () => {
        setFiltersData(filters);
        setViewMode(filters.viewMode); // Automatically update the view mode and close the filters
    };

    const resetFilters = () => {
        setFilters({
            viewMode: 'simple',
            sortBy: 'nearest',
            status: [],
            paymentMethods: [],
            accessType: [],
            ethanolBlends: [],
            hasBlenderPump: false
        });
        closeFilters();
    };

    return (        
        <View style={localStyles.mainContainer}>
            <List.Item
                title="Filters"
                titleStyle={[localStyles.title, {color: theme.colors.onBackground}]}
                style={localStyles.header}
                right={() => (
                    <Button 
                        icon="filter-remove" 
                        mode="text" 
                        onPress={resetFilters}
                    >
                        Reset
                    </Button>
                )}
            />
            <Divider style={styles.divider} />

            <ScrollView>
                <View style={localStyles.contentContainer}>
                    {/* View Mode Section */}
                    <List.Section title='View mode' titleStyle={localStyles.title}>
                        <SegmentedButtons
                            value={filters.viewMode}
                            density='small'
                            style={[localStyles.segmentedButtons, styles.shadow]}
                            buttons={[
                                {
                                    value: 'simple',
                                    label: 'Simple',
                                    icon: 'view-list',
                                    checkedColor: theme.colors.background,
                                    style: { backgroundColor: filters.viewMode === 'simple' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                },
                                {
                                    value: 'detailed',
                                    label: 'Detailed',
                                    icon: 'view-dashboard',
                                    style: { backgroundColor: filters.viewMode === 'detailed' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                    checkedColor: theme.colors.background,
                                },
                            ]}
                            onValueChange={value => setFilters({ ...filters, viewMode: value })}
                        />
                    </List.Section>

                    {/* Sort By Section */}
                    <List.Section title='Sort by' titleStyle={localStyles.title}>
                        <SegmentedButtons
                            value={filters.sortBy}
                            density='small'
                            style={[localStyles.segmentedButtons, styles.shadow]}
                            buttons={[
                                {
                                    value: 'nearest',
                                    label: 'Nearest',
                                    icon: 'map-marker',
                                    style: { backgroundColor: filters.sortBy === 'nearest' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                    checkedColor: theme.colors.background,
                                },
                                {
                                    value: 'name',
                                    label: 'Name',
                                    icon: 'alphabetical',
                                    style: { backgroundColor: filters.sortBy === 'name' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                    checkedColor: theme.colors.background,
                                },
                            ]}
                            onValueChange={value => setFilters({ ...filters, sortBy: value })}
                        />
                    </List.Section>

                    {/* Status Section */}
                    <List.Section title='Status' titleStyle={localStyles.title}>
                        <View style={localStyles.chipContainer}>
                            {statusOptions.map(status => (
                                <Chip
                                    key={status.id}
                                    icon={status.icon}
                                    selected={filters.status.includes(status.id)}
                                    onPress={() => toggleFilter('status', status.id)}
                                    style={[
                                        localStyles.chip,
                                        filters.status.includes(status.id) ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                                    ]}
                                >
                                    {status.label}
                                </Chip>
                            ))}
                        </View>
                    </List.Section>

                    {/* Payment Methods Section */}
                    <List.Section title='Payment methods' titleStyle={localStyles.title}>
                        <View style={localStyles.chipContainer}>
                            {paymentMethods.map(method => (
                                <Chip
                                    key={method.id}
                                    icon={method.icon}
                                    selected={filters.paymentMethods.includes(method.id)}
                                    onPress={() => toggleFilter('paymentMethods', method.id)}
                                    style={[
                                        localStyles.chip,
                                        filters.status.includes(method.id) ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                                    ]}
                                >
                                    {method.label}
                                </Chip>
                            ))}
                        </View>
                    </List.Section>

                    {/* Access Type Section */}
                    <List.Section title='Access type' titleStyle={localStyles.title}>
                        <View style={localStyles.chipContainer}>
                            {accessTypes.map(type => (
                                <Chip
                                    key={type.id}
                                    icon={type.icon}
                                    selected={filters.accessType.includes(type.id)}
                                    onPress={() => toggleFilter('accessType', type.id)}
                                    style={[
                                        localStyles.chip,
                                        filters.status.includes(type.id) ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                                    ]}
                                >
                                    {type.label}
                                </Chip>
                            ))}
                        </View>
                    </List.Section>

                    {/* Additional Features Section */}
                    <List.Section title='Additional features' titleStyle={localStyles.title}>
                        <Chip
                            icon="gas-station"
                            selected={filters.hasBlenderPump}
                            onPress={() => toggleBooleanFilter('hasBlenderPump')}
                            style={[
                                localStyles.chip,
                                filters.hasBlenderPump ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                            ]}
                        >
                            Blender Pump
                        </Chip>
                    </List.Section>
                </View>
            </ScrollView>

            <Button 
                icon="filter" 
                mode="contained" 
                style={localStyles.applyButton}
                onPress={applyFilters}
            >
                Apply filters
            </Button>
        </View>
    );
}

const localStyles = StyleSheet.create({
    mainContainer: {
        height: '100%',
    },
    
    header: {
        width: windowWidth,
        paddingHorizontal: 16,
        paddingBottom: 0,
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },

    contentContainer: {
        width: windowWidth,
        paddingHorizontal: 16,
        paddingBottom: 80, // Space for the apply button
    },
    
    segmentedButtons: {
        marginVertical: 8,
    },

    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginVertical: 8,
    },

    chip: {
        marginRight: 8,
        marginBottom: 8,
    },

    applyButton: {
        margin: 16,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
});