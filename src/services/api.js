import { nrelUrl } from "../constants/apiConstants";

export async function fetchStations(endpoint='', params='') {
    try {
        const response = await fetch(`${nrelUrl}${endpoint}.json?fuel_type=E85&api_key=${process.env.EXPO_PUBLIC_NREL_API_KEY}&${params}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch stations: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
}

export async function fetchCoordinates(address) {
    if(!address) return null;
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_GEOCODING_API_URL}?q=${encodeURIComponent(address)}&api_key=${process.env.EXPO_PUBLIC_GEOCODING_API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon)
            };
        }
        return null;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}
