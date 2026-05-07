import { createTheme } from '@mui/material';

const FontSizeMultiplier = 1.4;
const menuWidth = 200;
const HeaderHeight = 50;
const FooterHeight = 30;
const black = "#000000";
const HeaderBgColor = "#1c4f9b";
const HeaderTxtColor = '#ffffff';
const FooterBgColor = HeaderBgColor;
const FooterTxtColor = HeaderTxtColor;
const PrimaryBgColor = HeaderBgColor;
const SecondaryBgColor = '#fdf2af';
const NavBgColor = '#fdf2af';
const NavTxtColor = black;
const NavHoverBgColor = '#1c4f9b';
const NavHoverTxtColor = '#ffffff';
const NavSelectedBgColor = '#1c4f9b';
const NavSelectedTxtColor = '#ffffff';
const BtnPrimaryColor = "#1c4f9b";
const BtnPrimaryColorHover = "#5290ed";
const BtnPrimaryContainedHoverBg = 'rgba(54, 194, 105, 0.04)';
const BtnRedColor = "#9b1c2f";
const BtnRedColorHover = "#f1556c";
const TableHeaderBgColor = "#1c4f9b";
const TableHeaderTxtColor = "#ffffff";
const TableEvenRowColor = "#cfcfcf";
const SnackbarBottom = 10 + FooterHeight;
const SnackbarAlertStyles = {
    success: {
        backgroundColor: '#befbf9',
        color: '#17732c',
        '& .MuiAlert-icon': {
            color: '#17732c',
        },
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    error: {
        backgroundColor: '#da9da5',
        color: '#9b1c2f',
        '& .MuiAlert-icon': {
            color: '#9b1c2f',
        },
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    warning: {
        backgroundColor: '#f6b675',
        color: '#815a30',
        '& .MuiAlert-icon': {
            color: '#815a30',
        },
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    info: {
        backgroundColor: '#95ede9',
        color: '#208e88',
        '& .MuiAlert-icon': {
            color: '#208e88',
        },
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};
const ConfirmDialogColors = {
    success: {
        backgroundColor: '#90e6e2',
        confirmButtonColor: '#106a28',
        cancelButtonColor: '#757575'
    },
    delete: {
        backgroundColor: '#f8a37a',
        confirmButtonColor: '#9b1c2f',
        cancelButtonColor: '#000000'
    },
    warning: {
        backgroundColor: '#fce5a0',
        confirmButtonColor: '#faad3c',
        cancelButtonColor: '#757575'
    },
    info: {
        backgroundColor: '#a0eefd',
        confirmButtonColor: '#0e8498',
        cancelButtonColor: '#757575'
    }
};
// Create a custom theme
const theme = createTheme({
    direction: 'rtl',

    palette: {
        mode: 'light',
        primary: {
            main: '#0F3460',
            light: '#2d2d44',
            dark: '#0f0f1a',
        },
        secondary: {
            main: '#e94560',
            light: '#ff6b81',
            dark: '#c23852',
        },
        success: {
            main: '#16c79a',
        },
        warning: {
            main: '#f39c12',
        },
        background: {
            default: '#f8f9fa',
            paper: '#ffffff',
        },
    },

    typography: {
        fontFamily: '"Assistant", "Heebo", "Roboto", sans-serif',
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
        },
        h5: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h6: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
            letterSpacing: '0.02em',
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: '0.2s',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
                contained: {
                    boxShadow: 'none',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

export {
    menuWidth,
    HeaderHeight,
    FooterHeight,
    HeaderBgColor,
    HeaderTxtColor,
    FooterBgColor,
    FooterTxtColor,
    SnackbarAlertStyles,
    SnackbarBottom,
    ConfirmDialogColors,
    theme,
    TableHeaderTxtColor,
};
