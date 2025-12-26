import React, { useContext } from "react";
import { AuthContext } from "../../context/Slice";
import ShowTicket from "./ShowTicket"; 
import type { ticketProps } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../services/TicketService";
import Header from "../Header";
import Footer from "../Footer";

const ShowTicketDetails: React.FC = () => {
    const { state } = useContext(AuthContext);
    
    const { data: tickets, isLoading } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const token = state.token;
            const response = await getTickets(token);   
            return response;
        },
       
    });

   
    let filteredTickets = tickets;

    if (state.user?.role === 'customer') {
        filteredTickets = tickets?.filter((ticket: ticketProps) => 
            ticket.created_by === state.user?.id
        );
    } else if (state.user?.role === 'agent') {
        filteredTickets = tickets?.filter((ticket: ticketProps) => 
            ticket.assigned_to === state.user?.id
        );
    }
   

    return (
        <>
         <Header />
            <h1 style={{ textAlign: 'center', direction: 'rtl' }}>רשימת טיקטים</h1>
            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>טוען טיקטים, אנא המתן...</p>
                </div> 
            ) : filteredTickets?.length > 0 ? (
                <div style={{ direction: 'rtl' }}>
                    {filteredTickets.map((ticket: ticketProps) => (
                        <ShowTicket key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>אין טיקטים להצגה</p>
                </div>
            )}
            <Footer />
        </>
    );
};

export default ShowTicketDetails;