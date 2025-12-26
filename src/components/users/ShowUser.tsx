
import React, { useContext, useState } from "react";
import type { UserProps } from "../../types";
const ShowTicket: React.FC<UserProps > = ({ name, email, role, created_at } ) => {

return (
            <div>
               <h2> {name} :שם</h2>
               <p>{email} :מייל</p>
               <p>{role} :תפקיד</p>
               <p>{created_at} :נוצר בתאריך</p>
              
       
         </div>
      ); 
};
export default ShowTicket;