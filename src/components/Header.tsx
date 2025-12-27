import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex";
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import About from "../pages/About";

const Header: React.FC = () => {
    const { state } = useContext(AuthContext);
    const user = state.user;

  
    if (!user) {
        return (
            <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        🎫 מערכת ניהול טיקטים
                    </Typography>
                    <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
                        כניסה
                    </Button>
                    <Button color="inherit" component={Link} to="/about" startIcon={<InfoIcon />}>
                        אודות
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    🎫 מערכת ניהול טיקטים
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {user.role === 'admin' && (
                        <>
                            <Button color="inherit" component={Link} to="/users/new" startIcon={<PersonAddIcon />}>
                                הוסף משתמש
                            </Button>
                            <Button color="inherit" component={Link} to="/users" startIcon={<PeopleIcon />}>
                                הצגת משתמשים
                            </Button>
                            <Button color="inherit" component={Link} to="/status">
                                סטטוסים
                            </Button>
                            <Button color="inherit" component={Link} to="/priority">
                                עדיפויות
                            </Button>
                        </>
                    )}

                    {user.role === 'customer' && (
                        <Button color="inherit" component={Link} to="/tickets/new" startIcon={<AddCircleIcon />}>
                            יצירת טיקט
                        </Button>
                    )}

                    <Button color="inherit" component={Link} to="/tickets" startIcon={<ConfirmationNumberIcon />}>
                        הצגת טיקטים
                    </Button>
                    <Button color="inherit" component={Link} to="/dashboard" startIcon={<HomeIcon />}>
                        בית
                    </Button>
                    <Button color="inherit" component={Link} to="/about" startIcon={<InfoIcon />}>
                        אודות
                    </Button>
                    <Button color="inherit" component={Link} to="/logout" startIcon={<LogoutIcon />}>
                        התנתקות
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
    
}

export default Header;