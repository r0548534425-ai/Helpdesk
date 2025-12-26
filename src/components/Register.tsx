
import React, { use, useContext } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import{Navigate, useNavigate} from 'react-router-dom'  
import { AuthContext } from "../context/Slice"
import axios from "axios"; 
import{RegisterUser} from "../services/AuthService.ts"; 
import type { RegisterInput } from "../types/index.ts";


// interface IFormInput {
//      name: string
//     email: string
//     password: string
 
// }


const Register:React.FC = () => {

  const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm<IFormInput>()
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

const {state} = useContext(AuthContext);
const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
  const isSuccess = await RegisterUser(data,dispatch);
  if(isSuccess) {       
swal({
  title: "ההרשמה הצליחה!",
  text: "נרשמת בהצלחה!!",
  icon: "success"
});
    navigate('/home');
  }
};




  return (
    <>
    <h1>הרשמה</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="שם" {...register("name" ,{ required: "שם הוא שדה חובה", maxLength: 20,})} />
      {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
    <input placeholder="אימייל" {...register("email" ,{ required: "אמייל הוא שדה חובה", maxLength: 20,pattern:{value:/^\S+@\S+\.\S+$/,message:"אימייל לא תקין"}})} />
    {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
      <input placeholder="סיסמה" type="password" {...register("password", { required: "סיסמה היא שדה חובה", maxLength: 20,pattern:{value:/^(?=.*?[a-z]).{8,}$/,message:"סיסמא חייבת לכלול אות גדולה, קטנה, מספר וסימן מיוחד"}})} />
      {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
     <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "שולח נתונים..." : "הרשמה"}
        </button>
    </form>
    </>
  )
};

export default  Register;