import { Paper, Box, Typography } from '@mui/material';
import { FooterHeight, FooterTxtColor } from '../theme_params.jsx';
import React from "react";

function Footer() {
    return (
        <Paper
            variant="footer"
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                height: FooterHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingX: 2
            }}
        >
            <Typography variant="body2" >
                &copy; {new Date().getFullYear()} Adva Ohana
            </Typography>
        </Paper>
    );
}

export default Footer;