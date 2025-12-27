import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContex';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Logout: React.FC = () => {

const{dispatch}=useContext(AuthContext);
const navigate=useNavigate(); 


    useEffect(() => {
        dispatch({type:'LOGOUT'});
   
     swal({
        title: "התנתקות הצליחה!",
        text: "התנתקת בהצלחה!!",
        icon: "success",
    }).then(() => {
       
        navigate('/dashboard');
    });
        }, []);
    return (null);

   



}
export default Logout;