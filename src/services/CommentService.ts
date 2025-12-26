import axios from "axios";
import swal from "sweetalert";
import type { CommentInputAdd } from "../types";

export const AddComment = async (variables: CommentInputAdd) => {
    try {
        const response = await axios.post(
            `http://localhost:4000/tickets/${variables.ticketId}/comments`, 
            {
                content: variables.content
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${variables.token}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "אירעה שגיאה במהלך הוספת התגובה.";
        swal({
            title: "שגיאה בהוספת תגובה",
            text: message,
            icon: "error"
        });
        throw error;
    }
}

export const getComments = async (ticketId: number, token: string | null) => {
    try {
        const response = await axios.get(
            `http://localhost:4000/tickets/${ticketId}/comments`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "אירעה שגיאה במהלך קבלת התגובות.";
        swal({
            title: "שגיאה בקבלת תגובות",
            text: message,
            icon: "error"
        });
        return null;
    }
}

