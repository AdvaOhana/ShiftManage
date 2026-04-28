// ToastContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SnackbarBottom, SnackbarAlertStyles as alertStyles } from "../theme_params.jsx";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const showToast = (message, severity = 'success') => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const hideToast = () => {
        setOpen(false);
    };


    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={(_, reason) => reason !== 'clickaway' && hideToast()}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                sx={{
                    bottom: `${SnackbarBottom}px !important`
                }}
            >
                <Alert
                    onClose={hideToast}
                    severity={severity}
                    sx={alertStyles[severity]}
                    variant="filled"     // Can be "standard", "filled", or "outlined"
                >
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);