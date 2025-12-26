import React, { useContext } from "react";
import { AuthContext } from "../../context/Slice";
import { Link } from "react-router-dom";
import type { TicketInput, TickeToDelete, ticketProps, UserProps } from "../../types";
import { ShowUsers } from "../../services/userService";
import { DeleteTicketApi } from "../../services/TicketService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateTicket } from "../../services/TicketService";
import swal from "sweetalert";
import { GetStatus } from "../../services/StatusService";
import { Box, Card, CardContent } from "@mui/material";



const ShowTicket: React.FC<{ ticket: ticketProps }> = ({ ticket }) => {
  const { state } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:(variables:TicketInput) => UpdateTicket(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      swal({ title: "הסוכן עודכן בהצלחה!", icon: "success" });
    }
  });

  const mutationStatus = useMutation({
    mutationFn:(variables:TicketInput) => UpdateTicket(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      swal({ title: "סטטוס עודכן בהצלחה!", icon: "success" });
    }
  });

  const mutationDelete = useMutation({
    mutationFn:(variables:TickeToDelete) => DeleteTicketApi(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      swal({ title: "הטיקט נמחק בהצלחה!", icon: "success" });
    }
    
  });
  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryKey: ["agents", state.token],
    queryFn: async () => {
      const allUsers = await ShowUsers(state.token);
      return allUsers?.filter((u: UserProps) => u.role === "agent") || [];
    },
    enabled: !!state.token && state.user?.role === 'admin',
  });

 
  const { data: statusList, isLoading: isLoadingStatus } = useQuery({
    queryKey: ["status"],
    queryFn: () => GetStatus(state.token),
    enabled: !!state.token && (state.user?.role === 'admin' || state.user?.role === 'agent'),
  });

  return (
    <>
      <h2>{ticket.subject} :נושא</h2>
      <p>{ticket.description} :תאור</p>
      <p>{typeof ticket.status_name === 'object' && ticket.status_name ? (ticket.status_name as any).name : ticket.status_name} :סטטוס</p>
      <p>{typeof ticket.priority_name === 'object' && ticket.priority_name ? (ticket.priority_name as any).name : ticket.priority_name} :עדיפות</p>
      <p>{ticket.created_at} :נוצר בתאריך</p>
      <p>{ticket.updated_at} :עודכן בתאריך</p>

     
      {(state.user?.role === 'agent' || state.user?.role === 'admin') && (
        <div style={{ margin: "10px 0" }}>

          <div style={{ marginTop: "10px" }}>
            {isLoadingStatus ? (
              <p>טוען סטטוסים...</p>
            ) : (
              <label>שנה סטטוס
              <select 
              
              value={ticket.status_id || ""}
                onChange={(e) => {
                  mutationStatus.mutate(
                    {
                      id: ticket.id,  
                      assigned_to: ticket.assigned_to,  
                      status_id: Number(e.target.value),
                      priority_id: ticket.priority_id,
                      token: state.token,
                    }
                 
                  )
                 
               
                }}
              >
                
                {statusList?.map((s: any) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              
              </select>
              </label>
            )}
           
           
          </div>
           
        </div>
      )}

     
      {state.user?.role === 'admin' && (
        <div style={{ marginTop: '10px' }}>
          {isLoadingAgents ? (
            <p>טוען סוכנים...</p>
          ) : (
            <label>שנה סוכן
            <select 
              defaultValue={ticket.assigned_to || ""} 
              onChange={(e) => {
                mutation.mutate({
                  ...ticket,
                  assigned_to: Number(e.target.value),
                  token: state.token,
                  
                });
              }}
            >
              
              {agents?.map((agent: UserProps) => (
                <option key={agent.id} value={agent.id ?? ""}>{agent.name}</option>
              ))}
            </select>
           </label>
            
          )}
         
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
        id: ticket.id,
        token: state.token,
      });
    }
  });
}}>
  מחיקת טיקט
</button>
        </div>
      )}

  <Link to={`/comments/add/${ticket.id}`}>הוסף תגובה</Link>
     
  <Link to={`/tickets/${ticket.id}`}>הצג תגובות</Link>
    </>
  );
};

export default ShowTicket;