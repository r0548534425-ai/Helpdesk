import axios from "axios";
import swal from "sweetalert";

export const GetStatus=async(token:string|null)=>{
    try {
        const response = await axios.get("http://localhost:4000/statuses", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(error:any){   
        const message = error.response?.data?.message || "אירעה שגיאה במהלך קבלת הסטטוסים.";
   swal({
    title: "שגיאה בקבלת סטטוסים",
    text: message,
    icon: "error"
});
        return null;
    }
}

export const AddStatus=async(statusName: string, token:string|null)=>{
    try {
         await axios.post("http://localhost:4000/statuses", 
            { name: statusName },
            {
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return true;
    } catch (error: any) {
        const message = error.response?.data?.message ;
        swal({
            title: "שגיאה בהוספת סטטוס",
            text: message,
            icon: "error"
        });
       throw error
    }
};
