import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'  
import React, { useContext, useState } from "react"; 
import { AuthContext } from "../context/Slice"; 
import { Box, Card, CardContent, TextField, Button, Typography, CircularProgress, Container } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import swal from 'sweetalert'; 
import { loginUser } from "../services/AuthService";
import Header from "./Header";
import Footer from "./Footer";

interface IFormInput {
 email: string
  password: string
}

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    const isSuccess = await loginUser(data, dispatch); 
    setIsLoading(false);
    if (isSuccess) {
      swal({
        title: "התחברות הצליחה!",
        text: "התחברת בהצלחה!!",
        icon: "success"
      });
      navigate('/dashboard');
    }
  }

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
                <LoginIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  התחברות
                </Typography>
              </Box>

              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>מתחבר... אנא המתן</Typography>
                </Box>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
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
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
                  sx={{ 
                    mt: 3,
                    mb: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  {isLoading ? "מתחבר..." : "התחבר"}
                </Button>
              </form>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body1" gutterBottom>
                  עדיין לא רשום?
                </Typography>
                <Button
                  component={Link}
                  to="/Register"
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                  sx={{ 
                    mt: 1,
                    color: '#667eea',
                    borderColor: '#667eea',
                    '&:hover': {
                      borderColor: '#764ba2',
                      backgroundColor: 'rgba(102, 126, 234, 0.04)'
                    }
                  }}
                >
                  הרשמה
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Footer />
    </Box>
  )
}

export default Login;