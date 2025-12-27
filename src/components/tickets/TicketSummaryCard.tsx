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
    const getPriorityColor = (priority: string | null) => {
        switch (priority) {
            case 'נמוך': return 'success';
            case 'בינוני': return 'warning';
            case 'גבוה': return 'error';
            default: return 'default';
        }
    };

    const getStatusColor = (status: number | null) => {
        switch (status) {
            case 1: return '#4caf50'; // פתוח - ירוק
            case 2: return '#ff9800'; // בטיפול - כתום
            case 3: return '#f44336'; // סגור - אדום
            default: return '#9e9e9e';
        }
    };

    return (
        <Card 
            sx={{ 
                mb: 2, 
                '&:hover': { 
                    boxShadow: 6,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                },
                borderRight: `6px solid ${getStatusColor(ticket.status_id)}`
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
                            label={ticket.priority_name || 'לא צוין'} 
                            color={getPriorityColor(ticket.priority_name)}
                            size="small"
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
