import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useGlobalStyles } from "../styles/globalStyles";
import { List, useTheme, Divider, SegmentedButtons, Button, Chip, Switch } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { cards_accepted, statusOptions, accessTypes, otherEthanolBlends } from "../constants/nrelApiOptions"
import { initialFilters, initialViewMode, initialSortBy } from "../constants/filtersConstants";

const windowWidth = Dimensions.get('window').width;

export default function Filters({ sortBy, setSortBy, viewMode, setViewMode, onApply, filters, setFilters }) {
    const theme = useTheme();
    const styles = useGlobalStyles();

    const [tempViewMode, setTempViewMode] = useState(viewMode);
    const [tempSortBy, setTempSortBy] = useState(sortBy);
    const [tempFilters, setTempFilters] = useState(filters);

    const [sliderValue, setSliderValue] = useState(tempFilters.radius);

    const toggleFilter = (category, value) => {
        setTempFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value]
        }));
    };

    const toggleBooleanFilter = (category) => {
        setTempFilters(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const applyFilters = () => {
        // Only apply the filters if they have changed to avoid unnecessary API calls
        if(JSON.stringify(tempFilters) !== JSON.stringify(filters)) {
            onApply(tempFilters); // Perform a search with the new filters
        }
        setFilters(tempFilters);
        setViewMode(tempViewMode); // Automatically update the view mode and close the filters modal
        if(sortBy !== tempSortBy) {
            setSortBy(tempSortBy);
        }
    };

    const resetFilters = () => {
        // Update the temporary filters to the initial values
        setTempFilters(initialFilters);
        setTempViewMode(initialViewMode);
        setTempSortBy(initialSortBy);
        setSliderValue(initialFilters.radius);
        
        // Apply the changes to the actual filters
        onApply(initialFilters);
        setFilters(initialFilters);
        setViewMode(initialViewMode);
        setSortBy(initialSortBy);
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
                            value={tempViewMode}
                            density='small'
                            style={[localStyles.segmentedButtons, styles.shadow]}
                            buttons={[
                                {
                                    value: 'simple',
                                    label: 'Simple',
                                    icon: 'view-list',
                                    checkedColor: theme.colors.background,
                                    style: { backgroundColor: tempViewMode === 'simple' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                },
                                {
                                    value: 'detailed',
                                    label: 'Detailed',
                                    icon: 'view-dashboard',
                                    style: { backgroundColor: tempViewMode === 'detailed' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                    checkedColor: theme.colors.background,
                                },
                            ]}
                            onValueChange={value => setTempViewMode(value)}
                        />
                    </List.Section>
                    
                    {/* Sort By Section */}
                    <List.Section title='Sort by' titleStyle={localStyles.title}>
                        <SegmentedButtons
                            value={tempSortBy}
                            density='small'
                            style={[localStyles.segmentedButtons, styles.shadow]}
                            buttons={[
                                {
                                    value: 'nearest',
                                    label: 'Nearest',
                                    icon: 'map-marker',
                                    style: { backgroundColor: tempSortBy === 'nearest' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                    checkedColor: theme.colors.background,
                                },
                                {
                                    value: 'name',
                                    label: 'Name',
                                    icon: 'alphabetical',
                                    style: { backgroundColor: tempSortBy === 'name' ? theme.colors.primary : theme.colors.background, borderColor: 'transparent'},
                                    checkedColor: theme.colors.background,
                                },
                            ]}
                            onValueChange={value => setTempSortBy(value)}
                        />
                    </List.Section>

                    {/* Radius Section */}
                    <List.Section title='Search radius' titleStyle={localStyles.title}>
                        {/*  */}
                        <List.Item
                            title="No limit"
                            right={() => (
                                <Switch
                                    value={tempFilters.radius === "infinite"}
                                    onValueChange={() => {
                                        setTempFilters({ ...tempFilters, radius: tempFilters.radius === "infinite" ? initialFilters.radius : "infinite" });
                                        setSliderValue(initialFilters.radius);
                                    }}
                                />
                            )}
                        />
                        {/* Slider for the radius */}
                        {tempFilters.radius !== "infinite" && (
                        <>
                            <List.Item title={`${sliderValue} miles`} />
                            <Slider
                                lowerLimit={0}
                                minimumValue={0}
                                maximumValue={500}
                                step={1}
                                value={filters.radius}
                                onValueChange={(value) => setSliderValue(value)} // To show the value in real-time
                                onSlidingComplete={(value) => {
                                    setTempFilters({ ...tempFilters, radius: value });
                                }}
                                minimumTrackTintColor={theme.colors.primary}
                                disabled={tempFilters.radius === "infinite"}
                            />
                        </>
                        )}
                    </List.Section>

                    {/* Status Section */}
                    <List.Section title='Status' titleStyle={localStyles.title}>
                        <View style={localStyles.chipContainer}>
                            {statusOptions.map(status => (
                                <Chip
                                    key={status.id}
                                    icon={status.icon}
                                    selected={tempFilters.status.includes(status.id)}
                                    onPress={() => toggleFilter('status', status.id)}
                                    style={[
                                        localStyles.chip,
                                        tempFilters.status.includes(status.id) ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                                    ]}
                                >
                                    {status.label}
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
                                selected={tempFilters.access === type.id} 
                                onPress={() => setTempFilters(prev => ({ ...prev, access: type.id }))} 
                                style={[
                                    localStyles.chip,
                                    tempFilters.access.includes(type.id) ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                                ]}
                            >
                                {type.label}
                            </Chip>
                        ))}
                        </View>
                    </List.Section>

                    {/* Ethanol Blends Section */}
                    <List.Section title='Ethanol blends' titleStyle={localStyles.title}>
                        <View style={localStyles.chipContainer}>
                        {otherEthanolBlends.map(blend => (
                            <Chip
                                key={blend.id}
                                selected={tempFilters.e85_other_ethanol_blends.includes(blend.id)}
                                onPress={() => toggleFilter('e85_other_ethanol_blends', blend.id)}
                                style={[
                                    localStyles.chip,
                                    tempFilters.e85_other_ethanol_blends.includes(blend.id) ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                                ]}
                            >
                                {blend.label}
                            </Chip>
                        ))}
                        </View>
                    </List.Section>

                    {/* Additional Features Section */}
                    <List.Section title='Additional features' titleStyle={localStyles.title}>
                        <Chip
                            icon="gas-station"
                            selected={tempFilters.e85_blender_pump}
                            onPress={() => toggleBooleanFilter('e85_blender_pump')}
                            style={[
                                localStyles.chip,
                                tempFilters.e85_blender_pump ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                            ]}
                        >
                            Blender Pump
                        </Chip>
                    </List.Section>

                    {/* Payment Methods Section */}
                    <List.Section title='Payment methods' titleStyle={localStyles.title}>
                        <View style={localStyles.chipContainer}>
                        {cards_accepted.map(method => (
                            <Chip
                                key={method.id}
                                icon={method.icon}
                                selected={tempFilters.cards_accepted.includes(method.id)}
                                onPress={() => toggleFilter('cards_accepted', method.id)}
                                style={[
                                    localStyles.chip,
                                    tempFilters.cards_accepted.includes(method.id) ? { backgroundColor: theme.colors.accent } : { backgroundColor: theme.colors.inverseOnSurface }
                                ]}
                            >
                                {method.label}
                            </Chip>
                        ))}
                        </View>
                    </List.Section>

                </View>
            </ScrollView>

            <Button 
                icon="filter" 
                mode="contained" 
                textColor="white"
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