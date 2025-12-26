import React, { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/Slice";
import { AddComment as AddCommentAPI } from "../../services/CommentService"; 
import type { CommentInputAdd } from "../../types";
import { Box, Card, CardContent, TextField, Button, Typography, CircularProgress, Container } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import Header from "../Header";
import Footer from "../Footer";

interface AddCommentProps {
    content: string;
    
}

const AddComment: React.FC =()   => {
    

     const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (variables: CommentInputAdd) => AddCommentAPI(variables),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tickets'] });
         swal({
                title: "התגובה נוספה בהצלחה!",
                icon: "success"
            });
            navigate('/tickets');  
      }
    });

    const { state } = useContext(AuthContext);
  
    const navigate = useNavigate();
    const { ticketID } = useParams<{ ticketID: string }>();
    const { register, handleSubmit, formState: { errors } } = useForm<AddCommentProps>();



       
const onSubmit: SubmitHandler<AddCommentProps> = (data) => {
    if (!ticketID || !state.token) {
        swal("שגיאה", "חסרים פרטים נדרשים", "error");
        return;
    }
    
    mutation.mutate({

            content: data.content,
            ticketId: Number(ticketID), 
            token: state.token
        });
};
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
            <Header />
            <Box 
                sx={{ 
                    flex: 1,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4,
                    px: 2,
                    overflow: 'auto'
                }}
            >
                <Container maxWidth="md">
                    <Card 
                        sx={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            borderRadius: 3,
                            direction: 'rtl'
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                <CommentIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                                    הוספת תגובה
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    הוסף תגובה לטיקט
                                </Typography>
                            </Box>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    fullWidth
                                    label="תוכן התגובה"
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    {...register("content", { 
                                        required: "תוכן הוא שדה חובה",
                                        maxLength: { value: 500, message: "תגובה ארוכה מדי" }
                                    })}
                                    error={!!errors.content}
                                    helperText={errors.content?.message}
                                    sx={{ direction: 'rtl' }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={mutation.isPending}
                                    startIcon={mutation.isPending ? <CircularProgress size={20} /> : <CommentIcon />}
                                    sx={{ 
                                        mt: 3,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                        }
                                    }}
                                >
                                    {mutation.isPending ? "שולח..." : "שלח תגובה"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
            <Footer />
        </Box>
    );
}

export default AddComment;