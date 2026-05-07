import { Paper, Typography } from '@mui/material';
import { FooterHeight } from '../theme_params.jsx';

function Footer() {
    return (
        <Paper
            variant="footer"
            component="footer"
            sx={{
                height: FooterHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '1px solid rgba(0,0,0,0.1)'
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Adva Ohana
            </Typography>
        </Paper>
    );
}

export default Footer;