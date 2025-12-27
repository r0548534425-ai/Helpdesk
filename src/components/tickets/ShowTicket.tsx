import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import type { TicketInput, TickeToDelete, ticketProps, UserProps } from "../../types";
import { ShowUsers } from "../../services/userService";
import { DeleteTicketApi } from "../../services/TicketService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UpdateTicket } from "../../services/TicketService";
import swal from "sweetalert";
import { GetStatus } from "../../services/StatusService";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, Chip, Divider, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import VisibilityIcon from '@mui/icons-material/Visibility';



const ShowTicket: React.FC<{ ticket: ticketProps; hideCommentsButton?: boolean }> = ({ ticket, hideCommentsButton = false }) => {
  const { state } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:(variables:TicketInput) => UpdateTicket(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticket', ticket.id] });
      swal({ title: "הסוכן עודכן בהצלחה!", icon: "success" });
    }
  });

  const mutationStatus = useMutation({
    mutationFn:(variables:TicketInput) => UpdateTicket(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['ticket', ticket.id] });
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
    <Box sx={{ direction: 'rtl', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h5" component="h2" fontWeight="bold" sx={{ color: '#667eea' }}>
          {ticket.subject}
        </Typography>
        <Chip 
          label={typeof ticket.priority_name === 'object' && ticket.priority_name ? (ticket.priority_name as any).name : ticket.priority_name}
          color="error"
          size="small"
        />
      </Box>

      <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
        {ticket.description}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <Chip 
          label={`סטטוס: ${typeof ticket.status_name === 'object' && ticket.status_name ? (ticket.status_name as any).name : ticket.status_name}`}
          color="primary"
          variant="outlined"
        />
        {ticket.created_at && (
          <Chip 
            label={`נוצר: ${new Date(ticket.created_at).toLocaleDateString('he-IL')}`}
            variant="outlined"
          />
        )}
        {ticket.updated_at && (
          <Chip 
            label={`עודכן: ${new Date(ticket.updated_at).toLocaleDateString('he-IL')}`}
            variant="outlined"
          />
        )}
      </Box>

      {(state.user?.role === 'agent' || state.user?.role === 'admin') && (
        <Box sx={{ mt: 3 }}>
          {isLoadingStatus ? (
            <CircularProgress size={24} />
          ) : (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>שנה סטטוס</InputLabel>
              <Select 
                value={ticket.status_id || ""}
                label="שנה סטטוס"
                onChange={(e) => {
                  mutationStatus.mutate({
                    id: ticket.id,  
                    assigned_to: ticket.assigned_to,  
                    status_id: Number(e.target.value),
                    priority_id: ticket.priority_id,
                    token: state.token,
                  })
                }}
              >
                {statusList?.map((s: any) => (
                  <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      )}

      {state.user?.role === 'admin' && (
        <Box sx={{ mt: 2 }}>
          {isLoadingAgents ? (
            <CircularProgress size={24} />
          ) : (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>שנה סוכן</InputLabel>
              <Select 
                value={ticket.assigned_to || ""}
                label="שנה סוכן"
                onChange={(e) => {
                  mutation.mutate({
                    ...ticket,
                    assigned_to: Number(e.target.value),
                    token: state.token,
                  });
                }}
                startAdornment={<PersonIcon sx={{ ml: 1, color: 'action.active' }} />}
              >
                {agents?.map((agent: UserProps) => (
                  <MenuItem key={agent.id} value={agent.id ?? ""}>{agent.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button 
            variant="contained" 
            color="error"
            fullWidth
            startIcon={<DeleteIcon />}
            onClick={() => {
              swal({
                title: "האם את בטוחה?",
                text: "לאחר המחיקה לא ניתן יהיה לשחזר את הטיקט!",
                icon: "warning",
                buttons: ["ביטול", "כן, מחק!"],
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  mutationDelete.mutate({
                    id: ticket.id,
                    token: state.token,
                  });
                }
              });
            }}
            sx={{ mb: 2 }}
          >
            מחיקת טיקט
          </Button>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button 
          component={Link} 
          to={`/comments/add/${ticket.id}`}
          variant="contained"
          startIcon={<CommentIcon />}
          sx={{ 
            flex: hideCommentsButton ? undefined : 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            }
          }}
        >
          הוסף תגובה
        </Button>
        
        {!hideCommentsButton && (
          <Button 
            component={Link} 
            to={`/tickets/${ticket.id}`}
            variant="outlined"
            startIcon={<VisibilityIcon />}
            sx={{ 
              flex: 1,
              borderColor: '#667eea',
              color: '#667eea',
              '&:hover': {
                borderColor: '#764ba2',
                backgroundColor: 'rgba(102, 126, 234, 0.04)'
              }
            }}
          >
            הצג תגובות
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ShowTicket;