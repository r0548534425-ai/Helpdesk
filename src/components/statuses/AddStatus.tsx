import axios from "axios";
import React, { useContext } from "react";
import { AddStatus } from "../../services/StatusService";
import { AuthContext } from "../../context/Slice";
import { useForm, type SubmitHandler } from "react-hook-form";
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
   
    <>
      <Header />
    <h1>יצירת Status</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="סטטוס" {...register("status" ,{ required: "נושא הוא שדה חובה", maxLength: 20})} />
      {errors.status && <span style={{ color: "red" }}>{errors.status.message}</span>}
      
      <input type="submit" />
    </form>
   
    <Footer />
    </>
    )
}

export default AddStatusApi;