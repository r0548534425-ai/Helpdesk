import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TicketSummaryCard from "./TicketSummaryCard"; 
import type { ticketProps } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../services/TicketService";
import { Box, Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Header from "../Header";
import Footer from "../Footer";

const ShowTicketDetails: React.FC = () => {
    const { state } = useContext(AuthContext);
    
    const { data: tickets, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const token = state.token;
            const response = await getTickets(token);   
            return response;
        },
       
    });

   
    let filteredTickets = tickets;

    if (state.user?.role === 'customer') {
        filteredTickets = tickets?.filter((ticket: ticketProps) => 
            ticket.created_by === state.user?.id
        );
    } else if (state.user?.role === 'agent') {
        filteredTickets = tickets?.filter((ticket: ticketProps) => 
            ticket.assigned_to === state.user?.id
        );
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
                        <ConfirmationNumberIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
                            רשימת טיקטים
                        </Typography>
                    </Box>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress sx={{ color: 'white', mb: 2 }} size={60} />
                                <Typography sx={{ color: 'white' }}>טוען טיקטים, אנא המתן...</Typography>
                            </Box>
                        </Box>
                    ) : filteredTickets?.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, direction: 'rtl' }}>
                            {filteredTickets.map((ticket: ticketProps) => (
                                <TicketSummaryCard key={ticket.id} ticket={ticket} />
                            ))}
                        </Box>
                    ) : (
                        <Card sx={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            borderRadius: 3,
                            textAlign: 'center',
                            py: 8
                        }}>
                            <CardContent>
                                <ConfirmationNumberIcon sx={{ fontSize: 80, color: '#667eea', mb: 2, opacity: 0.5 }} />
                                <Typography variant="h5" color="text.secondary">
                                    אין טיקטים להצגה
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};

export default ShowTicketDetails;