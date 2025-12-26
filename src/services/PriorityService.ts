
import axios from "axios";
import swal from "sweetalert";
const GetPriorities=async(token:string|null)=>{
    try {
        const response = await axios.get("http://localhost:4000/priorities", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(error:any){   
        const message = error.response?.data?.message || "אירעה שגיאה במהלך קבלת העדיפויות.";
   swal({
    title: "שגיאה בקבלת עדיפויות",
    text: message,
    icon: "error"
});
        return null;
    }
}
const AddPriority=async(priority:string, token:string|null)=>{
    try {
         await axios.post("http://localhost:4000/priorities", {
            name: priority
         },{
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }
        });
        return true;
    } catch (error: any) {
    const message = error.response?.data?.message ;
   swal({
    title: "שגיאה בהוספת עדיפות",
    text: message,
    icon: "error"
});
        return false;
    }
};


export { GetPriorities, AddPriority };