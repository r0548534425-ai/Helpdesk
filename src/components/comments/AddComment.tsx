import React, { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/Slice";
import { AddComment as AddCommentAPI } from "../../services/CommentService"; 
import type { AddCommentInput, CommentInput, CommentInputAdd } from "../../types";
import Header from "../Header";
import Footer from "../Footer";
interface AddCommentProps {
    content: string;
    
}

const AddComment: React.FC =()   => {
    

     const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (variables: CommentInputAdd) => AddCommentAPI(variables),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tickets'] });
         swal({
                title: "התגובה נוספה בהצלחה!",
                icon: "success"
            });
            navigate('/tickets');  
      }
    });

    const { state } = useContext(AuthContext);
  
    const navigate = useNavigate();
    const { ticketID } = useParams<{ ticketID: string }>();
    const { register, handleSubmit, formState: { errors } } = useForm<AddCommentProps>();



       
const onSubmit: SubmitHandler<AddCommentProps> = (data) => {
    if (!ticketID || !state.token) {
        swal("שגיאה", "חסרים פרטים נדרשים", "error");
        return;
    }
    
    mutation.mutate({

            content: data.content,
            ticketId: Number(ticketID), 
            token: state.token
        });
};
    return (
        <>
        <Header />
        <div style={{ direction: 'rtl' }}>
            <h1>יצירת Comment</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input placeholder="תן תגובה" {...register("content", { required: "תוכן הוא שדה חובה", maxLength: 20 })} />
                    {errors.content && <span style={{ color: "red" }}>{errors.content.message}</span>}
                </div>
    
               <input 
                    type="submit" 
                    value={mutation.isPending ? "שולח..." : "שלח תגובה"} 
                    disabled={mutation.isPending}
                />
            </form>
        </div>
        <Footer />
        </>
    );
}

export default AddComment;