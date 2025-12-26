import React, { useContext } from 'react';
import { AuthContext } from '../context/Slice';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../services/TicketService';
import type { ticketProps } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Container, Typography, Card, CardContent, Grid2 as Grid, Button } from '@mui/material';
import { ConfirmationNumber, CheckCircle, PriorityHigh, PersonAdd, People, Assignment } from '@mui/icons-material';

const Dashboard: React.FC = () => {
    const { state } = useContext(AuthContext);

    const { data: tickets } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const response = await getTickets(state.token);
            return response;
        },
        enabled: !!state.token,
    });

    if (!state.user) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Typography variant="h4">טוען...</Typography>
            </Box>
        );
    }

    // סינון טיקטים לפי role
    let myTickets = tickets || [];
    if (state.user.role === 'customer') {
        myTickets = tickets?.filter((t: ticketProps) => t.created_by === state.user?.id) || [];
    } else if (state.user.role === 'agent') {
        myTickets = tickets?.filter((t: ticketProps) => t.assigned_to === state.user?.id) || [];
    }

    // חישוב סטטיסטיקות
    const openTickets = myTickets?.filter((t: ticketProps) => t.status_id !== 3) || []; // 3 = סגור
    const urgentTickets = myTickets?.filter((t: ticketProps) => t.priority_id === 3) || []; // 3 = דחוף

    // ================== CUSTOMER DASHBOARD ==================
    if (state.user.role === 'customer') {
        return (
            <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <Header />
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold', color: '#667eea', textAlign: 'center' }}>
                        ברוך הבא, {state.user.name}! 👋
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: '#666', textAlign: 'center' }}>
                        לוח בקרה אישי - לקוח
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                    <ConfirmationNumber sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{myTickets.length}</Typography>
                                    <Typography variant="h6">סך הכל טיקטים</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                    <CheckCircle sx={{ fontSize: 60, mb: 2 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{openTickets.length}</Typography>
                                    <Typography variant="h6">טיקטים פתוחים</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button 
                            component={Link} 
                            to="/tickets/new" 
                            variant="contained" 
                            size="large"
                            startIcon={<ConfirmationNumber />}
                            sx={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            פתח טיקט חדש
                        </Button>
                        <Button 
                            component={Link} 
                            to="/tickets" 
                            variant="contained" 
                            size="large"
                            startIcon={<Assignment />}
                            sx={{ 
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            צפה בכל הטיקטים שלי
                        </Button>
                    </Box>
                </Container>
                <Footer />
            </Box>
        );
    }

   
    if (state.user.role === 'agent') {
        return (
            <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <Header />
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold', color: '#11998e', textAlign: 'center' }}>
                        לוח בקרה - סוכן 🛠️
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: '#666', textAlign: 'center' }}>
                        שלום {state.user.name}, הנה הטיקטים שהוקצו אליך
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <ConfirmationNumber sx={{ fontSize: 50, mb: 1 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{myTickets.length}</Typography>
                                    <Typography variant="body1">טיקטים שהוקצו אליך</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <CheckCircle sx={{ fontSize: 50, mb: 1 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{openTickets.length}</Typography>
                                    <Typography variant="body1">טיקטים פתוחים</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <PriorityHigh sx={{ fontSize: 50, mb: 1 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{urgentTickets.length}</Typography>
                                    <Typography variant="body1">דחופים</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            component={Link} 
                            to="/tickets" 
                            variant="contained" 
                            size="large"
                            startIcon={<Assignment />}
                            sx={{ 
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            צפה בכל הטיקטים המוקצים לי
                        </Button>
                    </Box>
                </Container>
                <Footer />
            </Box>
        );
    }

    // ================== ADMIN DASHBOARD ==================
    if (state.user.role === 'admin') {
        const unassignedTickets = tickets?.filter((t: ticketProps) => !t.assigned_to) || [];
        const allOpenTickets = tickets?.filter((t: ticketProps) => t.status_id !== 3) || []; // 3 = סגור
        const allUrgentTickets = tickets?.filter((t: ticketProps) => t.priority_id === 3) || []; // 3 = דחוף

        return (
            <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                 <Header />
                <Container maxWidth="xl" sx={{ py: 6 }}>
                    <Typography variant="h3" sx={{ mb: 1, fontWeight: 'bold', color: '#667eea', textAlign: 'center' }}>
                        לוח בקרה - מנהל 👑
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: '#666', textAlign: 'center' }}>
                        שלום {state.user.name}, הנה סטטיסטיקות המערכת
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <ConfirmationNumber sx={{ fontSize: 50, mb: 1 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{tickets?.length || 0}</Typography>
                                    <Typography variant="body1">סך הכל טיקטים</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <CheckCircle sx={{ fontSize: 50, mb: 1 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{allOpenTickets.length}</Typography>
                                    <Typography variant="body1">טיקטים פתוחים</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <PriorityHigh sx={{ fontSize: 50, mb: 1 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{allUrgentTickets.length}</Typography>
                                    <Typography variant="body1">דחופים</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <Card sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', boxShadow: 4 }}>
                                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                    <Assignment sx={{ fontSize: 50, mb: 1 }} />
                                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{unassignedTickets.length}</Typography>
                                    <Typography variant="body1">ממתינים להקצאה</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button 
                            component={Link} 
                            to="/tickets" 
                            variant="contained" 
                            size="large"
                            startIcon={<ConfirmationNumber />}
                            sx={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                px: 3,
                                py: 1.5
                            }}
                        >
                            צפה בכל הטיקטים
                        </Button>
                        <Button 
                            component={Link} 
                            to="/users" 
                            variant="contained" 
                            size="large"
                            startIcon={<People />}
                            sx={{ 
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                px: 3,
                                py: 1.5
                            }}
                        >
                            ניהול משתמשים
                        </Button>
                        <Button 
                            component={Link} 
                            to="/users/new" 
                            variant="contained" 
                            size="large"
                            startIcon={<PersonAdd />}
                            sx={{ 
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                px: 3,
                                py: 1.5
                            }}
                        >
                            הוסף משתמש
                        </Button>
                    </Box>
                </Container>
                <Footer />
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Typography variant="h4">טוען...</Typography>
        </Box>
    );
}

export default Dashboard;