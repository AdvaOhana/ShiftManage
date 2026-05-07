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
    Typography
} from '@mui/material';
import { NavLink, useLocation } from 'react-router';
import { navItems } from '../Routers/main_R';
import { menuWidth } from "../theme_params.jsx";

const NavBar = ({ mobileOpen, onClose }) => {
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const drawerContent = (
        <Box sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                תפריט
            </Typography>

            <List>
                {navItems.map((item) => {
                    const isSelected = location.pathname === item.path;

                    return (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            selected={isSelected}
                            onClick={() => isMobile && onClose()}
                            sx={{
                                borderRadius: 2,
                                mb: 1,

                                '&.Mui-selected': {
                                    bgcolor: 'primary.main',
                                    color: '#fff',

                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                    },

                                    '& .MuiListItemIcon-root': {
                                        color: '#fff',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: isSelected
                                        ? '#fff'
                                        : theme.palette.text.primary,
                                    minWidth: 40
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ height: '100%' }}>
            <Drawer
                anchor="left"
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: menuWidth,
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    height: '100%',
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                {drawerContent}
            </Box>
        </Box>
    );
};

export default NavBar;