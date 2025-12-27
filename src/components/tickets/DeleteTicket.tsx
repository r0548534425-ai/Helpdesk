
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import type { TickeToDelete } from "../../types";
import { DeleteTicketApi } from "../../services/TicketService";
import { QueryClient, useMutation } from "@tanstack/react-query";
import swal from "sweetalert";
const DeleteTicket: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = new QueryClient();
    const id=useParams().id;
    const {state}=useContext(AuthContext);
      const mutationDelete = useMutation({
    mutationFn:(variables:TickeToDelete) => DeleteTicketApi(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      swal({ title: "הטיקט נמחק בהצלחה!", icon: "success" }).then(() => {
      navigate('/tickets');
      });
    }
    
  });
    return (
        <>
        <button onClick={() => {
  swal({
    title: "האם את בטוחה?",
    text: "לאחר המחיקה לא ניתן יהיה לשחזר את הטיקט!",
    icon: "warning",
    buttons: ["ביטול", "!כן, מחק"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      mutationDelete.mutate({
        id: Number(id),
        token: state.token,
      });
    }
  });
}}>
  מחיקת טיקט
</button>
        </>
    );


}
export default DeleteTicket;