import React, { useContext } from "react";
import { AddStatus } from "../../services/StatusService";
import { AuthContext } from "../../context/AuthContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Box, Card, CardContent, TextField, Button, Typography, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

interface IFormInput {
    status: string;
}
      
const AddStatusApi: React.FC = ()=>{
   const { state } = useContext(AuthContext);   
   const navigate = useNavigate() 
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      
 
          const response = await AddStatus(data.status, state.token);
          if (response) {
            swal("Success", "Status נוסף בהצלחה", "success");
           
         
            
          }
           navigate(-1);

          
        };

    return(  
   
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
        <Container maxWidth="sm">
          <Card 
            sx={{ 
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              borderRadius: 3,
              direction: 'rtl'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  יצירת סטטוס חדש
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  הוסף סטטוס חדש למערכת
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="שם הסטטוס"
                  variant="outlined"
                  margin="normal"
                  {...register("status", { 
                    required: "סטטוס הוא שדה חובה",
                    maxLength: { value: 50, message: "שם ארוך מדי" }
                  })}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  sx={{ direction: 'rtl' }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<CheckCircleIcon />}
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  צור סטטוס
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

export default AddStatusApi;