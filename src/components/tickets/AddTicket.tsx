
import React, { useContext, useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import{useNavigate} from 'react-router-dom'  
import { AuthContext } from "../../context/AuthContex"
import swal from 'sweetalert';
import {AddTicketApi} from "../../services/TicketService"
import {GetPriorities} from "../../services/PriorityService"
import { Box, Card, CardContent, TextField, Button, Typography, CircularProgress, Container, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Header from "../Header"
import Footer from "../Footer"




interface Priority {
  id: number;
  name: string;
}
interface IFormInput {
  subject: string;
  description: string;
  priority_id: number;
}

const AddTicket:React.FC = () => {
  const[priority,setPriority]=useState<Priority[]>([]);
  const[isSubmitting, setIsSubmitting] = useState(false);
  
  const{state}=useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    const completeData = {
      
      token: state.token,
      subject: data.subject,
      description: data.description,
      priority_id: Number(data.priority_id),
      status_id: 1,
      assigned_to: 1
 

      
    };
    const response = await AddTicketApi(completeData);
    setIsSubmitting(false);
    if (response) {
      swal({
        title: "Ticket created successfully",
        icon: "success"
      });
      navigate('/dashboard');
    }

    
  };
    useEffect(() => {
      const fetchStatuses = async () => {
        const priority = await GetPriorities(state.token);
        if (priority) {
          setPriority(priority);
       
        }
      };
      fetchStatuses();
    }, []);



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
                <ConfirmationNumberIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  יצירת טיקט חדש
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  מלא את הפרטים ליצירת פנייה חדשה
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="נושא"
                  variant="outlined"
                  margin="normal"
                  {...register("subject", { 
                    required: "נושא הוא שדה חובה",
                    maxLength: { value: 100, message: "נושא ארוך מדי" }
                  })}
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                  sx={{ direction: 'rtl' }}
                />

                <TextField
                  fullWidth
                  label="תיאור"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  {...register("description", { 
                    required: "תיאור הוא שדה חובה",
                    maxLength: { value: 500, message: "תיאור ארוך מדי" }
                  })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  sx={{ direction: 'rtl' }}
                />

                <FormControl 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.priority_id}
                  sx={{ direction: 'rtl', textAlign: 'right' }}
                >
                  <InputLabel>עדיפות</InputLabel>
                  <Select
                    label="עדיפות"
                    defaultValue=""
                    {...register("priority_id", { required: "עדיפות היא שדה חובה" })}
                  >
                    <MenuItem value="">בחר עדיפות</MenuItem>
                    {priority.map((p) => (
                      <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                    ))}
                  </Select>
                  {errors.priority_id && (
                    <FormHelperText>{errors.priority_id.message}</FormHelperText>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <ConfirmationNumberIcon />}
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  {isSubmitting ? "שולח..." : "צור טיקט"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default AddTicket

