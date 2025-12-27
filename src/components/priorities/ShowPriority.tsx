
import React, { useContext, useEffect, useState } from "react";
import { GetPriorities } from "../../services/PriorityService";
import { AuthContext } from "../../context/AuthContext";
import { Box, Container, Typography, CircularProgress, Card, CardContent, Chip } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Header from "../Header";
import Footer from "../Footer";

interface Priority {
    id: number;
    name: string;
}

const ShowPriority: React.FC = () => {
   const [priority, setPriority] = useState<Priority[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const { state } = useContext(AuthContext);

   useEffect(() => {
    const fetchPriorities = async () => {
        try {
            const response = await GetPriorities(state.token);
            if (response) {
                setPriority(response);
            }
        } catch (error) {
            console.error("Error fetching priorities:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchPriorities();
   }, [state.token]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
            <Header />
            <Box 
                sx={{ 
                    flex: 1,
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    py: 4,
                    px: 2,
                    overflow: 'auto'
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <PriorityHighIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
                            רשימת עדיפויות
                        </Typography>
                    </Box>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress sx={{ color: 'white', mb: 2 }} size={60} />
                                <Typography sx={{ color: 'white' }}>טוען עדיפויות...</Typography>
                            </Box>
                        </Box>
                    ) : priority.length === 0 ? (
                        <Card sx={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            borderRadius: 3,
                            textAlign: 'center',
                            py: 8
                        }}>
                            <CardContent>
                                <PriorityHighIcon sx={{ fontSize: 80, color: '#667eea', mb: 2, opacity: 0.5 }} />
                                <Typography variant="h5" color="text.secondary">
                                    אין עדיפויות להצגה
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                            {priority.map((item) => (
                                <Card 
                                    key={item.id}
                                    sx={{ 
                                        width: { xs: '100%', sm: '45%', md: '30%' },
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                        borderRadius: 3,
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                            transition: 'all 0.3s ease'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <PriorityHighIcon sx={{ fontSize: 50, color: '#667eea', mb: 2 }} />
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {item.name}
                                        </Typography>
                                        <Chip 
                                            label={`מזהה: ${item.id}`}
                                            size="small"
                                            sx={{ mt: 1 }}
                                        />
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Container>
            </Box>
            <Footer />
        </Box>       
    );
}

export default ShowPriority;