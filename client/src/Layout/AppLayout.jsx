import React, { useState, useMemo } from 'react'; // Add useState import
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "./Footer.jsx";
import { Outlet, useMatches } from "react-router";
import { Box, Typography } from '@mui/material';
import { menuWidth, HeaderHeight, FooterHeight, FooterBgColor, HeaderBgColor } from "../theme_params.jsx";

function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const matches = useMatches();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const currentTitle = useMemo(() => {
        const match = matches.find(match => match.handle?.title);
        return match?.handle?.title || 'Shift Manage';
    }, [matches]);

    return (
        <Box sx={{
            display: 'grid',
            minHeight: '100vh',
            gridTemplateRows: `${HeaderHeight}px 1fr ${FooterHeight}px`,
            gridTemplateColumns: {
                xs: '1fr',
                md: `${menuWidth}px 1fr`
            },
            gridTemplateAreas: {
                xs: `
                    "header"
                    "main"
                    "footer"
                `,
                md: `
                    "header header"
                    "nav main"
                    "footer footer"
                `
            }
        }}>

            <Box sx={{
                gridArea: 'header',
                height: `${HeaderHeight}px`
            }}>
                <Header onMenuClick={handleDrawerToggle} title={currentTitle} />
            </Box>

            <Box sx={{
                gridArea: 'nav',
                display: { xs: 'none', md: 'block' },
            }}>
                <NavBar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
            </Box>

            <Box sx={{
                gridArea: 'main',
                overflow: 'auto',
                borderRight: `1px solid ${HeaderBgColor}`,
                borderLeft: `1px solid ${HeaderBgColor}`,
                p: 2
            }}>
                <Outlet />
            </Box>

            <Box sx={{
                gridArea: 'footer',
                height: `${FooterHeight}px`,
                // display: 'flex',
                // alignItems: 'center',
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
                <Footer />
            </Box>

        </Box>
    );
}

export default AppLayout;