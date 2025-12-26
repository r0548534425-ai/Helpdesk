
import swal from "sweetalert";
import type { TicketInput, TickeToDelete } from "../types";
import axios from "axios";



const AddTicketApi=async(ticket:TicketInput)=>{
    try{
       const{token,...dataToSend}=ticket;
        await axios.post("http://localhost:4000/tickets", dataToSend,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });
        return true;
    } catch (error: any) {
    const message = error.response?.data?.message ;
    swal({
    title: "שגיאה ביצירת טיקט",
    text: message,
    icon: "error"
    });
    return false;
  }

}



const UpdateTicket=async(update:TicketInput)=>{
    const { id, token, ...dataToUpdate } = update;
    try {
         await axios.patch(`http://localhost:4000/tickets/${id}`, dataToUpdate, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return true;

    } catch (error: any) {
    const message = error.response?.data?.message ;
   swal({
    title: "שגיאה בעדכון הטיקט",
    text: message,
    icon: "error"
    
}
);      
throw error;
      
    
    }
}

const getTickets=async (token:string|null)=>{
    try{
        const response = await axios.get("http://localhost:4000/tickets/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(error:any){
        const message = error.response?.data?.message || "אירעה שגיאה במהלך קבלת הטיקטים.";
   swal({
    title: "שגיאה בקבלת טיקטים",
    text: message,
    icon: "error"
});
        return null;
}
}
const DeleteTicketApi=async(Ticket:TickeToDelete)=>{
    try {
         await axios.delete(`http://localhost:4000/tickets/${Ticket.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Ticket.token}`
            }
        });
        return true;
    } catch (error: any) {
    const message = error.response?.data?.message || "אירעה שגיאה במהלך מחיקת הטיקט.";
   swal({
    title: "שגיאה במחיקת הטיקט",
    text: message,
    icon: "error"
});
      throw error;
    }
}
  
export {AddTicketApi, UpdateTicket, getTickets,DeleteTicketApi}; 