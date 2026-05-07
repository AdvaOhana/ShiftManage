import React, { useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
    Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderHeight } from "../theme_params.jsx";

function Header({ onMenuClick, title }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <AppBar
            position="static"
            sx={{
                borderRadius: 0,
                justifyContent: 'center',
                height: `${HeaderHeight}px`,
                background: 'linear-gradient(135deg, #0F3460 0%, #2d2d44 100%)'
            }}
        >
            <Toolbar sx={{ minHeight: `${HeaderHeight}px` }}>
                {isMobile && (
                    <IconButton color="inherit" onClick={onMenuClick}>
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
}

export default Header;