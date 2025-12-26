
import React, { useContext, useEffect, useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import{Link, Navigate, useNavigate} from 'react-router-dom'  
import { AuthContext } from "../../context/Slice"
import axios from "axios"
import swal from 'sweetalert';
import {AddTicketApi} from "../../services/TicketService"
import {GetPriorities} from "../../services/PriorityService"
import type { ticketProps } from "../../types"
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
  
  const{state}=useContext(AuthContext);
  const token=state.token;  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const completeData = {
      
      token: state.token,
      subject: data.subject,
      description: data.description,
      priority_id: Number(data.priority_id),
      status_id: 1,
      assigned_to: 1
 

      
    };
    const response = await AddTicketApi(completeData);
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
    <>
     <Header />
    <h1>יצירת Ticket</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="נושא" {...register("subject" ,{ required: "נושא הוא שדה חובה", maxLength: 20})} />
      {errors.subject && <span style={{ color: "red" }}>{errors.subject.message}</span>}
      <input placeholder="תאור" type="textarea"{...register("description", { required: "תאור הוא שדה חובה", maxLength: 20})} />
      {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>};
      <select {...register("priority_id", { required: "Priority is required" })}>
      
        <option value="">בחר עדיפות</option>
        
        {priority.map((priority) => ( 
          <option key={priority.id} value={priority.id}>{priority.name}</option>
        ))}
      </select>
      {errors.priority_id && <span style={{ color: "red" }}>{errors.priority_id.message}</span>};
      
      <input type="submit" />
    </form>
    <Footer />
    </>
  )
}

export default AddTicket

