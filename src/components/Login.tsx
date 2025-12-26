import { useForm, type SubmitHandler } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'  
import React, { useContext } from "react"; 
import { AuthContext } from "../context/Slice"; 

import swal from 'sweetalert'; 
import { loginUser } from "../services/AuthService";

interface IFormInput {
 email: string
  password: string
}

const Login: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isSuccess = await loginUser(data, dispatch); 
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
    <>
      <h1>התחברות</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="אימייל" {...register("email", { required: "אמייל הוא שדה חובה", maxLength: 20, pattern: { value: /^\S+@\S+\.\S+$/, message: "אימייל לא תקין" } })} />
        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
        
        <input placeholder="סיסמה" type="password" {...register("password", { required: "סיסמה היא שדה חובה", maxLength: 20, pattern: { value: /^(?=.*?[a-z]).{8,}$/, message: "סיסמא חייבת לכלול אות גדולה, קטנה, מספר וסימן מיוחד" } })} />
        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
        
        <input type="submit" />
      </form>
      <h2>?עדיין לא רשום</h2>
      <button>
        <Link to="/Register">הרשמה</Link>
      </button>
    </>
  )
}

export default Login;