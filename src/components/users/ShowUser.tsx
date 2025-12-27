
import React from "react";
import type { UserProps } from "../../types";
import { Box, Typography, Avatar, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ShowTicket: React.FC<UserProps > = ({ name, email, role, created_at } ) => {

const getRoleIcon = () => {
    switch(role) {
        case 'admin': return <AdminPanelSettingsIcon />;
        case 'agent': return <SupportAgentIcon />;
        case 'customer': return <AccountCircleIcon />;
        default: return <PersonIcon />;
    }
}

const getRoleColor = () => {
    switch(role) {
        case 'admin': return 'error';
        case 'agent': return 'primary';
        case 'customer': return 'success';
        default: return 'default';
    }
}

const getRoleLabel = () => {
    switch(role) {
        case 'admin': return 'מנהל';
        case 'agent': return 'סוכן';
        case 'customer': return 'לקוח';
        default: return role;
    }
}

return (
    <Box sx={{ direction: 'rtl', p: 2, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar sx={{ 
                bgcolor: '#667eea', 
                width: 60, 
                height: 60,
                fontSize: 30
            }}>
                {getRoleIcon()}
            </Avatar>
        </Box>

        <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
            {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
                {email}
            </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
            <Chip 
                label={getRoleLabel()}
                color={getRoleColor() as any}
                icon={getRoleIcon()}
                sx={{ fontWeight: 'bold' }}
            />
        </Box>

        {created_at && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                    נוצר: {new Date(created_at).toLocaleDateString('he-IL')}
                </Typography>
            </Box>
        )}
    </Box>
); 
};
export default ShowTicket;