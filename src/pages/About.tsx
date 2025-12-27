import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContex';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Container, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BuildIcon from '@mui/icons-material/Build';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const About = () => {
   const { state } = useContext(AuthContext);
   
   return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <Container maxWidth="xl" sx={{ py: 6, px: 3 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea' }}>
                        🎫 מערכת ניהול טיקטים - TechSupport Pro
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                        הפתרון המושלם לניהול פניות שירות ותמיכה טכנית
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 6 }}>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
                        <Card sx={{ 
                            height: '100%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-8px)' }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <BusinessIcon sx={{ fontSize: 50, mr: 2 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        מי אנחנו?
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    TechSupport Pro היא חברה מובילה בתחום מתן שירותי תמיכה טכנית ללקוחות עסקיים ופרטיים.
                                    אנחנו פועלים כבר למעלה מ-10 שנים ומספקים פתרונות מהירים ויעילים לאלפי לקוחות ברחבי הארץ.
                                    המערכת שלנו מאפשרת מעקב מלא וניהול יעיל של כל פניות השירות.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
                        <Card sx={{ 
                            height: '100%',
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-8px)' }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <StarIcon sx={{ fontSize: 50, mr: 2 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        למה לבחור בנו?
                                    </Typography>
                                </Box>
                                <List>
                                    <ListItem>
                                        <ListItemIcon><AccessTimeIcon sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText 
                                            primary="זמינות 24/7" 
                                            secondary="צוות התמיכה שלנו זמין עבורך בכל שעה"
                                            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                                            secondaryTypographyProps={{ color: 'rgba(255,255,255,0.9)' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><SpeedIcon sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText 
                                            primary="מענה מהיר" 
                                            secondary="זמן תגובה ממוצע של פחות משעה"
                                            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                                            secondaryTypographyProps={{ color: 'rgba(255,255,255,0.9)' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><SupportAgentIcon sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText 
                                            primary="מומחיות טכנית" 
                                            secondary="צוות מנוסה ומיומן בכל תחומי הטכנולוגיה"
                                            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                                            secondaryTypographyProps={{ color: 'rgba(255,255,255,0.9)' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><VisibilityIcon sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText 
                                            primary="מעקב שקוף" 
                                            secondary="עקוב אחר הפניה שלך בזמן אמת"
                                            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                                            secondaryTypographyProps={{ color: 'rgba(255,255,255,0.9)' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><ThumbUpIcon sx={{ color: 'white' }} /></ListItemIcon>
                                        <ListItemText 
                                            primary="שביעות רצון גבוהה" 
                                            secondary="98% מהלקוחות שלנו ממליצים עלינו"
                                            primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                                            secondaryTypographyProps={{ color: 'rgba(255,255,255,0.9)' }}
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 6 }}>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
                        <Card sx={{ 
                            height: '100%',
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: 'white',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-8px)' }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <BuildIcon sx={{ fontSize: 50, mr: 2 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        השירותים שלנו
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                                    אנחנו מטפלים במגוון רחב של בעיות טכניות: תקלות במחשבים, בעיות רשת, התקנת תוכנות,
                                    אבטחת מידע, גיבויים, ועוד. כל פניה מטופלת בידי מומחה ייעודי שידאג לפתור את הבעיה שלך במהירות ובמקצועיות.
                                    המערכת שלנו מאפשרת ניהול מלא של התהליך מתחילתו ועד סופו.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
                        <Card sx={{ 
                            height: '100%',
                            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                            color: 'white',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'translateY(-8px)' }
                        }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <PhoneIcon sx={{ fontSize: 50, mr: 2 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        יצירת קשר
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <PhoneIcon sx={{ mr: 2 }} />
                                        <Typography variant="h6">טלפון: 03-1234567</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <EmailIcon sx={{ mr: 2 }} />
                                        <Typography variant="h6">אימייל: support@tickets.co.il</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <LocationOnIcon sx={{ mr: 2 }} />
                                        <Typography variant="h6">כתובת: רחוב הטכנולוגיה 15, תל אביב</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ borderTop: '2px solid rgba(255,255,255,0.3)', pt: 3, mt: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <AccessTimeIcon sx={{ mr: 2, fontSize: 40 }} />
                                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                            שעות פעילות
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        ראשון - חמישי: 24/7
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 2 }}>
                                        שישי: 08:00 - 15:00
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                                        🌟 אנחנו כאן בשבילך! 🌟
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>

                {!state.token && (
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                        <Button
                            component={Link}
                            to="/login"
                            variant="contained"
                            size="large"
                            sx={{ 
                                px: 6, 
                                py: 3,
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                                '&:hover': { 
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 12px 28px rgba(102, 126, 234, 0.6)'
                                }
                            }}
                        >
                            🚀 התחבר למערכת עכשיו
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
        <Footer />
    </Box>
   )
}
export default About;