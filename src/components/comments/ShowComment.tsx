
import React, { useContext } from 'react';
import type { CommentInput } from '../../types';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import { AuthContext } from '../../context/Slice';

const ShowComment: React.FC<CommentInput> = (comment) => {
    const { state } = useContext(AuthContext);
    const isMyMessage = state.user?.email === comment.author_email;
    const isCustomer = comment.author_role === 'customer';

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: isCustomer ? 'flex-start' : 'flex-end',
            mb: 2,
            direction: 'rtl'
        }}>
            <Paper sx={{
                maxWidth: '70%',
                p: 2,
                background: isCustomer 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: 'white',
                borderRadius: isCustomer ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
                boxShadow: 3
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                    <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: 'rgba(255,255,255,0.3)',
                        fontSize: '0.9rem'
                    }}>
                        {comment.author_name?.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {comment.author_name}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.7rem' }}>
                            {new Date(comment.created_at).toLocaleString('he-IL')}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                    {comment.content}
                </Typography>
            </Paper>
        </Box>
    );
}
export default ShowComment;