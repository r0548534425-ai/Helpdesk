import axios from "axios";
import type { CommentInput, CommentInputAdd } from "../types";

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
    } catch (error) {
        console.error("Error adding comment:", error);
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
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

