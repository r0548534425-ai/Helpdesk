import axios from "axios";
import type { UserInput, UserProps} from "../types";
import swal from 'sweetalert';

const addUserApi=async(completeData:UserInput, token:string|null)=>{
    
    try {
      
     
   const response = await axios.post("http://localhost:4000/users", completeData, {
      
    
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
   return response.status === 201 || response.status === 200;
  }
  catch (error: any) {
    const message = error.response?.data?.message || "אירעה שגיאה במהלך הוספת המשתמש.";
   swal({
    title: "שגיאה בהוספת משתמש",
    text: message,
    icon: "error"
});
    return false;
   
      
    
  }
}
const ShowUsers =async( token:string|null)=>{
    try {
        const response = await axios.get<UserProps[]>("http://localhost:4000/users/", { 
            headers: {
    
               "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
           });
        return response.data;
        
      
      } catch (error: any) {
    const message = error.response?.data?.message || "אירעה שגיאה במהלך הצגת המשתמשים.";
   swal({
    title: "שגיאה בהצגת משתמשים",
    text: message,
    icon: "error"
});
return null;
        }
    }





export { addUserApi, ShowUsers};