import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showSnackbar = (msg) => {
        setMessage(msg);
        setVisible(true);
    };

    const hideSnackbar = () => {
        setVisible(false);
        setMessage('');
    };

    return (
        <SnackbarContext.Provider value={{ visible, message, showSnackbar, hideSnackbar }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => {
    return useContext(SnackbarContext);
};
