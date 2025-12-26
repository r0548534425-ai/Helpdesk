
import React, { useContext } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom'  
import { AuthContext } from "../../context/Slice"
import type { UserInput } from "../../types"
import swal from 'sweetalert';
import { addUserApi } from "../../services/userService"
import { Box, Card, CardContent, TextField, Button, Typography, Container, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Header from "../Header"
import Footer from "../Footer"






const AddUser:React.FC = () => {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<UserInput>()
  const onSubmit: SubmitHandler<UserInput> = async (data) => {
    const token=state.token;
    const response = await addUserApi(data, token);
    if (response) {
      swal({
        title: "User created successfully",
        icon: "success"
      });
      navigate('/home');
      
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
                <PersonAddIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  יצירת משתמש חדש
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  הוסף משתמש חדש למערכת
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
                    required: "אימייל הוא שדה חובה",
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

                <FormControl 
                  fullWidth 
                  margin="normal" 
                  error={!!errors.role}
                  sx={{ direction: 'rtl', textAlign: 'right' }}
                >
                  <InputLabel>תפקיד</InputLabel>
                  <Select
                    label="תפקיד"
                    defaultValue=""
                    {...register("role", { required: "תפקיד הוא שדה חובה" })}
                  >
                    <MenuItem value="">בחר תפקיד</MenuItem>
                    <MenuItem value="admin">מנהל (Admin)</MenuItem>
                    <MenuItem value="agent">סוכן (Agent)</MenuItem>
                    <MenuItem value="customer">לקוח (Customer)</MenuItem>
                  </Select>
                  {errors.role && (
                    <FormHelperText>{errors.role.message}</FormHelperText>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<PersonAddIcon />}
                  sx={{ 
                    mt: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  צור משתמש
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

export default AddUser;