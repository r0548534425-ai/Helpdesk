import React from "react";
import { Box, Container, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                py: 6,
                mt: 'auto',
                width: '100%'
            }}
        >
            <Container maxWidth="xl" sx={{ px: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            🎫 מערכת ניהול טיקטים
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            הפתרון המושלם לניהול פניות שירות ותמיכה טכנית.
                            מערכת מתקדמת, פשוטה לשימוש ויעילה.
                        </Typography>
                    </Box>
                    
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            צור קשר
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
                            <PhoneIcon fontSize="small" />
                            <Typography variant="body2">03-1234567</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                            <EmailIcon fontSize="small" />
                            <Typography variant="body2">support@tickets.co.il</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                            <LocationOnIcon fontSize="small" />
                            <Typography variant="body2">רחוב הטכנולוגיה 15, תל אביב</Typography>
                        </Box>
                    </Box>
                    
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                            שעות פעילות
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            ראשון - חמישי: 24/7
                        </Typography>
                        <Typography variant="body2">
                            שישי: 08:00 - 15:00
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                            🌟 זמינים עבורכם בכל עת! 🌟
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 4, pt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        © 2025 מערכת ניהול טיקטים - כל הזכויות שמורות | נבנה עם 
                        <FavoriteIcon fontSize="small" sx={{ color: '#ff6b6b' }} />
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
