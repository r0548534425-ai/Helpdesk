
import React, { useContext, useEffect, useState } from "react";
import { GetPriorities } from "../../services/PriorityService";
import { AuthContext } from "../../context/Slice";
import Header from "../Header";
import Footer from "../Footer";

interface Priority {
    id: number;
    name: string;
}

const ShowPriority: React.FC = () => {
   const [priority, setPriority] = useState<Priority[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const { state } = useContext(AuthContext);

   useEffect(() => {
    const fetchPriorities = async () => {
        try {
            const response = await GetPriorities(state.token);
            if (response) {
                setPriority(response);
            }
        } catch (error) {
            console.error("Error fetching priorities:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchPriorities();
   }, [state.token]);

    return (
        <>
        <Header />
        <div style={{ padding: '20px', direction: 'rtl' }}>
            <h1>רשימת עדיפויות</h1>
            
            {isLoading ? (
                <div>טוען...</div>
            ) : priority.length === 0 ? (
                <div>אין עדיפויות להצגה</div>
            ) : (
                <div>
                    {priority.map((item) => (
                        <div key={item.id} style={{ 
                            padding: '10px', 
                            margin: '10px 0', 
                            border: '1px solid #ccc',
                            borderRadius: '5px'
                        }}>
                            <strong>מזהה:</strong> {item.id} <br />
                            <strong>שם:</strong> {item.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer />
        </>        
    );
}

export default ShowPriority;