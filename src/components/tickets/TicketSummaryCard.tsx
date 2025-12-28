import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { ticketProps } from '../../types';

interface TicketSummaryCardProps {
    ticket: ticketProps;
}

const TicketSummaryCard: React.FC<TicketSummaryCardProps> = ({ ticket }) => {
    return (
        <Card 
            sx={{ 
                mb: 2, 
                '&:hover': { 
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                }
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ConfirmationNumberIcon sx={{ color: '#667eea' }} />
                        <Typography variant="h6" component="div" fontWeight="bold">
                            {ticket.subject}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                            label={`עדיפות: ${ticket.priority_name || 'לא צוין'}`} 
                            size="small"
                            color="default"
                        />
                        <Chip 
                            label={`סטטוס: ${ticket.status_name || 'לא צוין'}`} 
                            size="small"
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                </Box>

                <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {ticket.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('he-IL') : 'לא זמין'}
                    </Typography>
                    <Button
                        component={Link}
                        to={`/tickets/${ticket.id}`}
                        variant="outlined"
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ 
                            borderColor: '#667eea',
                            color: '#667eea',
                            '&:hover': {
                                borderColor: '#764ba2',
                                backgroundColor: 'rgba(102, 126, 234, 0.04)'
                            }
                        }}
                    >
                        צפה בפרטים
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TicketSummaryCard;
