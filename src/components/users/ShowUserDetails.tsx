
import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Slice";
import type { UserProps } from "../../types";
import { ShowUsers } from "../../services/userService";
import ShowUser from "./ShowUser";
import { Box, Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import Header from "../Header";
import Footer from "../Footer";



const ShowUserDetails: React.FC = () => {
    const{state}=useContext(AuthContext);
    const[users,setUsers]=useState<UserProps[]>([]); 
    const[isLoading,setIsLoading]=useState<boolean>(true);

useEffect(() => {  

const fetchData = async () => {
   const data=await ShowUsers(state .token);
   if ((data)) {
   setUsers(data);
    }
    setIsLoading(false);
    };
    fetchData();

}, []);
    

  
    return(
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
                        <PeopleIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
                            רשימת משתמשים
                        </Typography>
                    </Box>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress sx={{ color: 'white', mb: 2 }} size={60} />
                                <Typography sx={{ color: 'white' }}>טוען נתונים...</Typography>
                            </Box>
                        </Box>
                    ) : users.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                            {users.map((user: UserProps) => (
                                <Card 
                                    key={user.id}
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
                                    <CardContent>
                                        <ShowUser {...user} />
                                    </CardContent>
                                </Card>
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
                                <PeopleIcon sx={{ fontSize: 80, color: '#667eea', mb: 2, opacity: 0.5 }} />
                                <Typography variant="h5" color="text.secondary">
                                    אין משתמשים להצגה
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
export default ShowUserDetails;

