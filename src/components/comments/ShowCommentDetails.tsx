import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Slice";
import { useNavigate, useParams } from "react-router-dom";
import ShowComment from "./ShowComment";
import type { CommentInput } from "../../types";
import { getComments } from "../../services/CommentService";
import { Box, Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Header from "../Header";
import Footer from "../Footer";

const ShowCommentDetails: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const{state}=useContext(AuthContext);
    const[isRunning,setIsRunning]=useState<boolean>(true) 
    const[response,setResponse]=useState<CommentInput[]>([]);

    const navigate=useNavigate();
    useEffect(()=>{
        const fetchComments= async()=>{
        try {
        let response= await getComments(Number(id),state.token);
     
        if(response){
          
            
            setResponse(response);
        }
        else{
            navigate(-1);
        }
      
     }finally {
                
                setIsRunning(false);
            }

  };
       if (id && state.token) {
    fetchComments();
}

       
    },[id,state.token]); 

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
                        <CommentIcon sx={{ fontSize: 60, color: 'white', mb: 2 }} />
                        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
                            תגובות לטיקט
                        </Typography>
                    </Box>

                    {isRunning ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <CircularProgress sx={{ color: 'white', mb: 2 }} size={60} />
                                <Typography sx={{ color: 'white' }}>טוען תגובות...</Typography>
                            </Box>
                        </Box>
                    ) : response.length === 0 ? (
                        <Card sx={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            borderRadius: 3,
                            textAlign: 'center',
                            py: 8
                        }}>
                            <CardContent>
                                <CommentIcon sx={{ fontSize: 80, color: '#667eea', mb: 2, opacity: 0.5 }} />
                                <Typography variant="h5" color="text.secondary">
                                    אין תגובות להצגה
                                </Typography>
                            </CardContent>
                        </Card>
                    ) : (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 2,
                            maxWidth: '900px',
                            mx: 'auto',
                            bgcolor: 'rgba(255,255,255,0.95)',
                            borderRadius: 3,
                            p: 3,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            minHeight: '400px'
                        }}>
                            <Typography variant="h6" sx={{ 
                                textAlign: 'center', 
                                color: '#667eea', 
                                mb: 2,
                                direction: 'rtl'
                            }}>
                                שיחת תמיכה
                            </Typography>
                            {response.map((comment, index) => (
                                <ShowComment key={index} {...comment} />
                            ))}
                        </Box>
                    )}
                </Container>
            </Box>
            <Footer />
        </Box>
    );
};
export default ShowCommentDetails;