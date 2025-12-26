import axios from "axios";
import React, { useContext } from "react";
import { AddPriority } from "../../services/PriorityService";
import { AuthContext } from "../../context/Slice";
import { useForm, type SubmitHandler } from "react-hook-form";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

interface IFormInput {
    priority: string;
}
      
const AddPriorityApi: React.FC = ()=>{
   const { state } = useContext(AuthContext);   
   const navigate = useNavigate() 
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      
 
          const response = await AddPriority(data.priority, state.token);
          if (response) {
            swal("Success", "Priority נוסף בהצלחה", "success");
           
         
            
          }
           navigate(-1);

          
        };

    return(  
   
    <>
      <Header />
    <h1>יצירת Priority</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="עדיפות" {...register("priority" ,{ required: "נושא הוא שדה חובה", maxLength: 20})} />
      {errors.priority && <span style={{ color: "red" }}>{errors.priority.message}</span>}
      
      <input type="submit" />
    </form>
   
    <Footer />
    </>
    )
}

export default AddPriorityApi;