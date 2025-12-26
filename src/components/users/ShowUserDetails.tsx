
import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Slice";
import { Link } from "react-router-dom";

import type { UserProps } from "../../types";
import { ShowUsers } from "../../services/userService";
import ShowUser from "./ShowUser";
import Header from "../Header";
import Footer from "../Footer";



const ShowUserDetails: React.FC = () => {
    const{state}=useContext(AuthContext);
    const[users,setUsers]=useState<UserProps[]>([]); 
useEffect(() => {  

const fetchData = async () => {
   const data=await ShowUsers(state .token);
   if ((data)) {
   setUsers(data);
    }
    };
    fetchData();

}, []);
    

  
    return(
        <>
         <Header />
   {users.length > 0 ? ( 
    users.map((user: UserProps) => (
  
  
        <ShowUser key={user.id}{...user} />

 
                ))
            ) : (
                <p>טוען נתונים...</p>
            )}
            <Footer />
        </>
    );
}; 
export default ShowUserDetails;

