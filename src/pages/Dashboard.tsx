import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContex';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../services/TicketService';
import type { ticketProps } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';

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
        return <div>טוען...</div>;
    }

   
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
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Box component="main" sx={{ flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                    <Container maxWidth="xl" sx={{ py: 4, px: 3 }}>
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea' }}>
                                ברוך הבא, {state.user.name}! 👋
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                לוח בקרה אישי - לקוח
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 45%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <ConfirmationNumberIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {myTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            סך הכל טיקטים
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
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <CheckCircleIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {openTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            טיקטים פתוחים
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                component={Link}
                                to="/tickets/new"
                                variant="contained"
                                size="large"
                                startIcon={<AddCircleOutlineIcon />}
                                sx={{ 
                                    px: 4, 
                                    py: 2,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    fontSize: '1.1rem',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                פתח טיקט חדש
                            </Button>
                            <Button
                                component={Link}
                                to="/tickets"
                                variant="contained"
                                size="large"
                                startIcon={<ConfirmationNumberIcon />}
                                sx={{ 
                                    px: 4, 
                                    py: 2,
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    fontSize: '1.1rem',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                צפה בכל הטיקטים שלי
                            </Button>
                        </Box>
                    </Container>
                </Box>
                <Footer />
            </Box>
        );
    }

   
    if (state.user.role === 'agent') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
                <Header />
                <Box sx={{ flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', overflow: 'auto' }}>
                    <Container maxWidth="xl" sx={{ py: 4, px: 2 }}>
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea' }}>
                                לוח בקרה - סוכן 🎯
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                שלום {state.user.name}, הנה הטיקטים שהוקצו אליך
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <AssignmentIndIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {myTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            טיקטים שהוקצו אליך
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <CheckCircleIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {openTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            טיקטים פתוחים
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <PriorityHighIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {urgentTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            דחופים
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                component={Link}
                                to="/tickets"
                                variant="contained"
                                size="large"
                                startIcon={<ConfirmationNumberIcon />}
                                sx={{ 
                                    px: 4, 
                                    py: 2,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    fontSize: '1.1rem',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                צפה בכל הטיקטים המוקצים לי
                            </Button>
                        </Box>
                    </Container>
                </Box>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
                <Header />
                <Box sx={{ flex: 1, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', overflow: 'auto' }}>
                    <Container maxWidth="xl" sx={{ py: 4, px: 2 }}>
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#667eea' }}>
                                לוח בקרה - מנהל 👨‍💼
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                שלום {state.user.name}, הנה סטטיסטיקות המערכת
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
                            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <ConfirmationNumberIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {tickets?.length || 0}
                                        </Typography>
                                        <Typography variant="h6">
                                            סך הכל טיקטים
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <CheckCircleIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {allOpenTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            טיקטים פתוחים
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <PriorityHighIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {allUrgentTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            דחופים
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 22%' } }}>
                                <Card sx={{ 
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                                    color: 'white',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}>
                                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                        <AssignmentIndIcon sx={{ fontSize: 60, mb: 2 }} />
                                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            {unassignedTickets.length}
                                        </Typography>
                                        <Typography variant="h6">
                                            ממתינים להקצאה
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Button
                                component={Link}
                                to="/tickets"
                                variant="contained"
                                size="large"
                                startIcon={<ConfirmationNumberIcon />}
                                sx={{ 
                                    px: 4, 
                                    py: 2,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    fontSize: '1.1rem',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                צפה בכל הטיקטים
                            </Button>
                            <Button
                                component={Link}
                                to="/users"
                                variant="contained"
                                size="large"
                                startIcon={<PeopleIcon />}
                                sx={{ 
                                    px: 4, 
                                    py: 2,
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    fontSize: '1.1rem',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                ניהול משתמשים
                            </Button>
                            <Button
                                component={Link}
                                to="/users/new"
                                variant="contained"
                                size="large"
                                startIcon={<AddCircleOutlineIcon />}
                                sx={{ 
                                    px: 4, 
                                    py: 2,
                                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                    fontSize: '1.1rem',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                הוסף משתמש
                            </Button>
                        </Box>
                    </Container>
                </Box>
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