
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Card, CardContent, Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListIcon from '@mui/icons-material/List';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from '../Header';
import Footer from '../Footer';

const Status: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
            <Header />
            <Box 
                sx={{ 
                    flex: 1,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                    px: 2,
                    overflow: 'auto'
                }}
            >
                <Container maxWidth="sm">
                    <Card 
                        sx={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            borderRadius: 3,
                            direction: 'rtl'
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <CheckCircleIcon sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
                                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                                    ניהול סטטוסים
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    צור וצפה בסטטוסים במערכת
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Button
                                    component={Link}
                                    to="/add-status"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={<AddCircleIcon />}
                                    sx={{ 
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                        },
                                        py: 2
                                    }}
                                >
                                    להוסיף סטטוס
                                </Button>

                                <Button
                                    component={Link}
                                    to="/show-status"
                                    variant="outlined"
                                    size="large"
                                    fullWidth
                                    startIcon={<ListIcon />}
                                    sx={{ 
                                        borderColor: '#667eea',
                                        color: '#667eea',
                                        '&:hover': {
                                            borderColor: '#764ba2',
                                            backgroundColor: 'rgba(102, 126, 234, 0.04)'
                                        },
                                        py: 2
                                    }}
                                >
                                    לצפות בסטטוסים
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}
export default Status;