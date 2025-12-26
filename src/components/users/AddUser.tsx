
import React, { useContext } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import{Link, Navigate, useNavigate} from 'react-router-dom'  
import { AuthContext } from "../../context/Slice"
import type { UserInput } from "../../types"
import swal from 'sweetalert';
import {addUserApi} from "../../services/userService"
import Header from "../Header"
import Footer from "../Footer"






const AddUser:React.FC = () => {
  const{state}=useContext(AuthContext);
  const token=state.token;  
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
    <>
     <Header />
    <h1>יצירת User</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="נושא" {...register("name" ,{ required: "נושא הוא שדה חובה", maxLength: 20})} />
      {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
      <input placeholder="מיייל" {...register("email", { required: "תאור הוא שדה חובה", maxLength: 20})} />
      {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>};
            <input  placeholder="סיסמה" type="password" {...register("password", { required: "תאור הוא שדה חובה", maxLength: 20})} />
      {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>};
      <div>

      <select {...register("role", { required: "Role is required" })}>
        <option value="">בחר תפקיד</option>
        <option value="admin">admin</option>
        <option value="agent">agent</option>
          <option value="customer">customer</option>
      </select>
      {errors.role && <span style={{ color: "red" }}>{errors.role.message}</span>};
      </div>
      <input type="submit" />
    </form>
    <Footer />

    </>
  )
};

export default AddUser;