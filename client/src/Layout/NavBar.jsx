import React from 'react';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router';
import { navItems } from '../Routers/main_R';
import { menuWidth } from "../theme_params.jsx";

const NavBar = ({ mobileOpen, onClose }) => {
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    // console.log(location.pathname);
    const drawerContent = (
        <Box sx={{ height: '100%' }}>
            <List component="nav" sx={{ height: '100%' }}>
                {navItems.map((item) => {
                    const isSelected = (location.pathname === item.path);
                    return (
                        <ListItemButton
                            key={item.path}
                            selected={location.pathname === item.path}
                            component={NavLink}
                            to={item.path}
                            onClick={() => isMobile && onClose()}
                            sx={{
                                backgroundColor: isSelected ?
                                    theme.palette.nav.selected.background :
                                    theme.palette.nav.main,
                                color: isSelected ?
                                    theme.palette.nav.selected.text :
                                    theme.palette.nav.text,
                                '&:hover': {
                                    backgroundColor: theme.palette.nav.hover.background,
                                    color: theme.palette.nav.hover.text
                                }
                            }}
                        >
                            <ListItemIcon sx={{
                                minWidth: 40,
                                color: isSelected ?
                                    theme.palette.nav.selected.text :
                                    theme.palette.nav.text

                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    )
                })}
            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ height: '100%' }}>
            {/* Mobile Drawer */}
            <Drawer
                anchor="left" // Add this line to make drawer open from right(because body has rtl)
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: menuWidth,
                        backgroundColor: theme.palette.nav.main
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    height: '100%',
                    backgroundColor: theme.palette.nav.main,
                }}
            >
                {drawerContent}
            </Box>
        </Box>
    );
};

export default NavBar;