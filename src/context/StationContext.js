import React, { createContext, useContext, useState } from 'react';

const StationContext = createContext();

export const StationProvider = ({ children }) => {
    const [nearbyStations, setNearbyStations] = useState([]);

    
    return (
        <StationContext.Provider value={{ nearbyStations, setNearbyStations }}>
            {children}
        </StationContext.Provider>
    );
};

export const useStation = () => {
    const context = useContext(StationContext);
    if (!context) {
        throw new Error('useStation must be used within a StationProvider');
    }
    return context;
}