import React, { useContext } from "react";
import { AuthContext } from "../context/Slice";
import { useNavigate, useParams } from "react-router-dom";
import ShowTicket from "../components/tickets/ShowTicket";
import ShowCommentDetails from "../components/comments/ShowCommentDetails";
import type { ticketProps } from "../types";
import { getTickets } from "../services/TicketService";
import { Box, Container, Typography, CircularProgress, Card, CardContent, Divider } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";

const TicketDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: tickets, isLoading } = useQuery({
        queryKey: ['tickets', state.token],
        queryFn: () => getTickets(state.token),
        enabled: !!state.token && !!id,
    });

    const ticket = tickets?.find((t: ticketProps) => t.id === Number(id)) || null;

    if (!isLoading && !ticket && tickets) {
        navigate(-1);
    }

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
                        <ConfirmationNumberIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: '#667eea' }}>
                            פרטי טיקט
                        </Typography>
                    </Box>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress sx={{ color: '#667eea', mb: 2 }} size={60} />
                                <Typography sx={{ color: 'text.secondary' }}>טוען נתונים...</Typography>
                            </Box>
                        </Box>
                    ) : !ticket ? (
                        <Card sx={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            borderRadius: 3,
                            textAlign: 'center',
                            py: 8
                        }}>
                            <CardContent>
                                <Typography variant="h5" color="text.secondary">
                                    טיקט לא נמצא
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {/* הטיקט המלא */}
                            <Card sx={{ 
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                borderRadius: 3,
                                mb: 4
                            }}>
                                <CardContent>
                                    <ShowTicket ticket={ticket} hideCommentsButton={true} />
                                </CardContent>
                            </Card>

                            {/* מפריד יפה */}
                            <Divider sx={{ my: 4 }}>
                                <Typography variant="h5" sx={{ color: '#667eea', display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CommentIcon /> תגובות
                                </Typography>
                            </Divider>

                            {/* התגובות */}
                            <ShowCommentDetails ticketId={Number(id)} />
                        </>
                    )}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default TicketDetailsPage;
