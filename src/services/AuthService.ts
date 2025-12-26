import axios from 'axios';
import swal from 'sweetalert';
import type { Dispatch } from 'react'; 
import type { AuthAction, RegisterInput } from '../types';

const RegisterUser = async (userData: RegisterInput, dispatch: Dispatch<AuthAction>) => {
    try {
        await axios.post("http://localhost:4000/auth/register", userData);

        const isSuccess = await loginUser({
            email: userData.email!, 
            password: userData.password!
        }, dispatch);
        
        return isSuccess;
    } catch (error: any) {
        const message = error.response?.data?.message || "אירעה שגיאה במהלך ההרשמה.";
        swal({
            title: "שגיאה בהרשמה",
            text: message,
            icon: "error"
        });
        return false;
    }
}

const loginUser = async (
    credentials: { email: string; password: string },
    dispatch: Dispatch<AuthAction>
) => { 
    try {
        const response = await axios.post(
            "http://localhost:4000/auth/login", 
            credentials,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        
        const data = response.data;
        localStorage.setItem("token", data.token);
        
        const user = await AuthMe(data.token);
        
        if (!user) {
            swal("שגיאה", "לא ניתן לקבל פרטי משתמש", "error");
            return false;
        }
        
        dispatch({
            type: "LOGIN",
            payload: {
                token: data.token,
                user: user
            }
        });
        
        return true;
    } catch (error: any) {
        const message = error.response?.data?.message || "אירעה שגיאה במהלך ההתחברות.";
        swal({
            title: "שגיאה בהתחברות",
            text: message,
            icon: "error"
        });
        return false;
    }
}

const AuthMe = async (token: string) => {
    try {
        const response = await axios.get("http://localhost:4000/auth/me", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        // Token לא תקף - לא מציגים שגיאה, פשוט מחזירים null
        console.log("Token is invalid or expired");
        return null;
    }
    
}

export { RegisterUser, loginUser, AuthMe };