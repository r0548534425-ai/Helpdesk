import React from "react";
import { Box, Container, Typography, Grid2 as Grid, Link } from "@mui/material";
import { Phone, Email, LocationOn, Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ 
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            color: 'white',
            py: 6,
            mt: 8
        }}>
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                            🎫 מערכת Helpdesk Pro
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                            מערכת מתקדמת לניהול טיקטים ושירות לקוחות. אנחנו כאן כדי לעזור לך לנהל את כל הפניות בצורה יעילה ומקצועית.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                            צור קשר
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                            <Phone fontSize="small" />
                            <Typography variant="body2">03-1234567</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                            <Email fontSize="small" />
                            <Typography variant="body2">support@helpdesk.co.il</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn fontSize="small" />
                            <Typography variant="body2">תל אביב, ישראל</Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                            עקוב אחרינו
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link href="#" sx={{ color: 'white', '&:hover': { color: '#667eea' } }}>
                                <Facebook />
                            </Link>
                            <Link href="#" sx={{ color: 'white', '&:hover': { color: '#667eea' } }}>
                                <Twitter />
                            </Link>
                            <Link href="#" sx={{ color: 'white', '&:hover': { color: '#667eea' } }}>
                                <LinkedIn />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        © 2025 מערכת ניהול טיקטים - כל הזכויות שמורות | נבנה באהבה ❤️
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
