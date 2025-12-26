
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Slice";
import { GetStatus } from "../../services/StatusService";
import Header from "../Header";
import Footer from "../Footer";

interface Status {
    id: number;
    name: string;
}

const ShowStatus: React.FC = () => {
   const [statusList, setStatusList] = useState<Status[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   const { state } = useContext(AuthContext);

   useEffect(() => {
    const fetchStatus = async () => {
        try {
            const response = await GetStatus(state.token);
            if (response) {
                setStatusList(response);
            }
        } catch (error) {
            console.error("Error fetching statuses:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchStatus();
   }, [state.token]);

    return (
        <>
        <Header />
        <div >
            <h1>רשימת סטטוסים</h1>
            
            {isLoading ? (
                <div>טוען...</div>
            ) : statusList.length === 0 ? (
                <div>אין סטטוסים להצגה</div>
            ) : (
                <div>
                    {statusList.map((item) => (
                        <div key={item.id} style={{ 
                           
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

export default ShowStatus;