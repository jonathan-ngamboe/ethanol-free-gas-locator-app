import { fetchStations } from "./api";


export async function getAllStations() {
    try {
        const stations = await fetchStations();
        return stations?.fuel_stations;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
}

const buildUrlParams = (paramsObject) => {
    // Filter key-value pairs to keep only those with valid values
    const validParams = Object.entries(paramsObject)
        .filter(([_, value]) => {
            // Check if the value is not null, undefined, or an empty string
            if (value === null || value === undefined || value === '') {
                return false;
            }
            // For numbers, check if it's a valid number
            if (typeof value === 'number' && !isNaN(value)) {
                return true;
            }
            // For strings, check if it's not an empty string after trimming
            if (typeof value === 'string' && value.trim() !== '') {
                return true;
            }
            // For booleans
            if (typeof value === 'boolean') {
                return true;
            }
            // For arrays, check if it's not empty
            if (Array.isArray(value) && value.length > 0) {
                return true;
            }
            return false;
        })
        .map(([key, value]) => {
            // If it's an array, join it with commas
            if (Array.isArray(value)) {
                return `${key}=${value.join(',')}`;
            }
            // For other types, encode the value
            return `${key}=${encodeURIComponent(value)}`;
        });

    return validParams.join('&');
};

export async function getNearbyStations(location = null, longitude = null, latitude = null, filters, limit='all') {
    if(!location && (!longitude || !latitude)) {
        throw new Error('Location or longitude and latitude must be provided');
    }
    try {
        const params = buildUrlParams({
            location,
            longitude,
            latitude,
            ...filters,
            limit
        });
        const stations = await fetchStations('/nearest', params);
        return stations?.fuel_stations;
    } catch (error) {
        console.error('Error fetching nearby stations:', error);
        throw error;
    }
}

export async function getStationDetails(id) {
    if(!id) {
        throw new Error('Station ID must be provided');
    }
    try {
        const stations = await fetchStations(`/${id}`);
        return stations?.alt_fuel_station;
    } catch (error) {
        console.error('Error fetching station details:', error);
        throw error;
    }
}