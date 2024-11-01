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

export async function getNearbyStations(longitude, latitude, radius='infinite') {
    try {
        const params = [`longitude=${longitude}`, `latitude=${latitude}`, `radius=${radius}`];
        const stations = await fetchStations('/nearest', params);
        return stations?.fuel_stations;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
}