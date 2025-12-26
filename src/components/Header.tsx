import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Slice";
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { Home, Dashboard, ConfirmationNumber, People, Label, CheckCircle, Logout, Login, AddCircle } from '@mui/icons-material';

const Header: React.FC = () => {
    const { state } = useContext(AuthContext);
    const user = state.user;

  
    if (!user) {
        return (
            <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button component={Link} to="/login" startIcon={<Login />} sx={{ color: 'white' }}>כניסה</Button>
                            <Button component={Link} to="/" startIcon={<Home />} sx={{ color: 'white' }}>אודות</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }

    return (
        <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: 3 }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box component="div" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                        🎫 מערכת Helpdesk
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {user.role === 'admin' && (
                            <>
                                <Button component={Link} to="/users/new" startIcon={<AddCircle />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>הוסף משתמש</Button>
                                <Button component={Link} to="/users" startIcon={<People />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>משתמשים</Button>
                                <Button component={Link} to="/status" startIcon={<CheckCircle />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>סטטוסים</Button>
                                <Button component={Link} to="/priority" startIcon={<Label />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>עדיפויות</Button>
                            </>
                        )}

                        {user.role === 'customer' && (
                            <Button component={Link} to="/tickets/new" startIcon={<AddCircle />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>יצירת טיקט</Button>
                        )}

                        <Button component={Link} to="/tickets" startIcon={<ConfirmationNumber />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>טיקטים</Button>
                        <Button component={Link} to="/dashboard" startIcon={<Dashboard />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>בית</Button>
                        <Button component={Link} to="/" startIcon={<Home />} sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>אודות</Button>
                        <Button component={Link} to="/logout" startIcon={<Logout />} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>התנתק</Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
    
}

export default Header;