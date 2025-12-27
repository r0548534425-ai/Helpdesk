
import React, { useContext } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom'  
import { AuthContext } from "../context/Slice"
import { RegisterUser } from "../services/AuthService.ts"; 
import type { RegisterInput } from "../types/index.ts";
import { Box, Card, CardContent, TextField, Button, Typography, CircularProgress, Container } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import swal from "sweetalert";
import Header from "./Header";
import Footer from "./Footer";


const Register:React.FC = () => {

  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm<RegisterInput>()
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
  const isSuccess = await RegisterUser(data,dispatch);
  if(isSuccess) {       
swal({
  title: "ההרשמה הצליחה!",
  text: "נרשמת בהצלחה!!",
  icon: "success"
});
    navigate('/dashboard');
  }
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
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <PersonAddIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  הרשמה
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  צור חשבון חדש במערכת
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="שם מלא"
                  variant="outlined"
                  margin="normal"
                  {...register("name", { 
                    required: "שם הוא שדה חובה",
                    maxLength: { value: 50, message: "שם ארוך מדי" }
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ direction: 'rtl' }}
                />

                <TextField
                  fullWidth
                  label="אימייל"
                  variant="outlined"
                  margin="normal"
                  {...register("email", { 
                    required: "אמייל הוא שדה חובה",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "אימייל לא תקין" }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ direction: 'rtl' }}
                />

                <TextField
                  fullWidth
                  label="סיסמה"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  {...register("password", { 
                    required: "סיסמה היא שדה חובה",
                    minLength: { value: 8, message: "סיסמה חייבת להכיל לפחות 8 תווים" }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ direction: 'rtl' }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <PersonAddIcon />}
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  {isSubmitting ? "שולח נתונים..." : "הרשמה"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
};

export default  Register;