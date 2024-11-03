import React, { createContext, useContext, useRef, useEffect } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const mapRef = useRef(null);

    const setMapRef = (ref) => {
        mapRef.current = ref;
    };

    useEffect(() => {
        console.log('MapProvider mounted');
        console.log('Map Ref:', mapRef);
    }, [mapRef]);

    return (
        <MapContext.Provider value={{ mapRef, setMapRef }}>
            {children}
        </MapContext.Provider>
    );
}

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
}