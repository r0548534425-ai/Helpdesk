
import React, { use, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/Slice";
import type { TickeToDelete } from "../../types";
import { DeleteTicketApi } from "../../services/TicketService";
import { QueryClient, useMutation } from "@tanstack/react-query";
const DeleteTicket: React.FC = () => {
    const queryClient = new QueryClient();
    const id=useParams().id;
    const {state}=useContext(AuthContext);
      const mutationDelete = useMutation({
    mutationFn:(variables:TickeToDelete) => DeleteTicketApi(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      swal({ title: "הטיקט נמחק בהצלחה!", icon: "success" });
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