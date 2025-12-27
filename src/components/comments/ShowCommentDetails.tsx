import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Slice";
import { useNavigate } from "react-router-dom";
import ShowComment from "./ShowComment";
import type { CommentInput } from "../../types";
import { getComments } from "../../services/CommentService";
import { Box, Typography, CircularProgress } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

interface ShowCommentDetailsProps {
    ticketId: number;
}

const ShowCommentDetails: React.FC<ShowCommentDetailsProps> = ({ ticketId }) => {

    const{state}=useContext(AuthContext);
    const[isRunning,setIsRunning]=useState<boolean>(true) 
    const[response,setResponse]=useState<CommentInput[]>([]);

    const navigate=useNavigate();
    useEffect(()=>{
        const fetchComments= async()=>{
        try {
        let commentsResponse= await getComments(ticketId, state.token);
        if(commentsResponse){
            setResponse(commentsResponse);
        } else {
            navigate(-1);
        }
      
     }finally {
                
                setIsRunning(false);
            }

  };
       if (ticketId && state.token) {
    fetchComments();
}

       
    },[ticketId,state.token]); 

    return (
        <>
            {isRunning ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress sx={{ color: '#667eea', mb: 2 }} size={60} />
                        <Typography sx={{ color: 'text.secondary' }}>טוען תגובות...</Typography>
                    </Box>
                </Box>
            ) : response.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CommentIcon sx={{ fontSize: 80, color: '#667eea', mb: 2, opacity: 0.5 }} />
                    <Typography variant="h5" color="text.secondary">
                        אין תגובות להצגה
                    </Typography>
                </Box>
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
                    minHeight: '200px'
                }}>
                    {response.map((comment, index) => (
                        <ShowComment key={index} {...comment} />
                    ))}
                </Box>
            )}
        </>
    );
};
export default ShowCommentDetails;