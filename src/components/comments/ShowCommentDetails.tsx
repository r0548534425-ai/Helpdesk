import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Slice";

import { useNavigate, useParams } from "react-router-dom";
import ShowComment from "./ShowComment";
import type { CommentInput } from "../../types";
import { getComments } from "../../services/CommentService";
import Header from "../Header";
import Footer from "../Footer";
const ShowCommentDetails: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const{state}=useContext(AuthContext);
    const[isRunning,setIsRunning]=useState<boolean>(true) 
    const[response,setResponse]=useState<CommentInput[]>([]);

    const navigate=useNavigate();
    useEffect(()=>{
        const fetchComments= async()=>{
        try {
        let response= await getComments(Number(id),state.token);
     
        if(response){
          
            
            setResponse(response);
        }
        else{
            navigate(-1);
        }
      
     }finally {
                
                setIsRunning(false);
            }

  };
       if (id && state.token) {
    fetchComments();
}

       
    },[id,state.token]); 

    return (
<>
        <Header />
    {isRunning ?( <div>Loading...</div> ):(
        <div>
            {response.length === 0 ? ( 
                <p>אין תגובות להצגה.</p>
            ) : (
                <>
                    <h2>Comments Details</h2>
                    {response.map((comment, index)=>(
                        <ShowComment 
                            key={index} {...comment}  />
                    ))}
                </>
            )}
        </div>
    )}
    <Footer />
</>
);
};
export default ShowCommentDetails;