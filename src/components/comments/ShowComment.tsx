
import React, { useContext } from 'react';
import type { CommentInput } from '../../types';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { AuthContext } from '../../context/AuthContext';

const ShowComment: React.FC<CommentInput> = (comment) => {
    const { state } = useContext(AuthContext);
    const isMyMessage = state.user?.email === comment.author_email;

    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexDirection: isMyMessage ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 2,
                mb: 2,
                direction: 'ltr'
            }}
        >
            <Avatar sx={{ 
                bgcolor: isMyMessage ? '#764ba2' : '#667eea',
                width: 40,
                height: 40
            }}>
                <PersonIcon />
            </Avatar>
            
            <Paper 
                elevation={3}
                sx={{ 
                    maxWidth: '70%',
                    p: 2,
                    borderRadius: 3,
                    background: isMyMessage 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : '#ffffff',
                    color: isMyMessage ? 'white' : 'text.primary',
                    direction: 'rtl'
                }}
            >
                <Typography 
                    variant="subtitle2" 
                    fontWeight="bold" 
                    sx={{ 
                        mb: 0.5,
                        color: isMyMessage ? 'rgba(255,255,255,0.9)' : '#667eea'
                    }}
                >
                    {comment.author_name}
                </Typography>
                
                <Typography 
                    variant="body1" 
                    sx={{ 
                        mb: 1,
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                    }}
                >
                    {comment.content}
                </Typography>

                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5,
                    justifyContent: 'flex-end'
                }}>
                    <AccessTimeIcon sx={{ 
                        fontSize: 12, 
                        color: isMyMessage ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                    }} />
                    <Typography 
                        variant="caption" 
                        sx={{ 
                            color: isMyMessage ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                            fontSize: '0.7rem'
                        }}
                    >
                        {comment.created_at ? new Date(comment.created_at).toLocaleString('he-IL', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit'
                        }) : 'לא זמין'}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
export default ShowComment;