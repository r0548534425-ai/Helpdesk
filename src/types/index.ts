export  interface ticketProps{
     id: number | null,   
    subject: string,
    description: string,
    status_id:number | null,
    priority_id: number | null,
    status_name: number | null,
    priority_name: string | null,
    created_by: number | null,
    assigned_to: number | null,
    created_at: string| null,
    updated_at:string | null
    }

export interface TicketInput {
  id?: number | null,
  subject?: string,
  description?: string,
  status_id?: number | null,
  priority_id?: number | null,
  assigned_to?: number | null,
  token?: string | null,
}
export  interface TickeToDelete{ 
  
    id: number | null,
    token: string | null,
}
export interface CommentInputAdd {
    content: string;
    ticketId: number; 
    token: string;    
}

export  interface commentProps{
  ticket_id: number | null,
  author_id: number | null,
  content: string | null,
  author_name: string | null    ,
  author_email: string | null,
  created_at: string | null,
}

export interface UserInput {
  name: string
  email: string
  password:string   
  role: "customer"
  
 
}
export interface UserProps{
    id: number | null,
    name: string | null,
    email: string | null,
    role: "admin" | "customer" | "agent" | null,
    created_at: string | null,  
}
export interface RegisterInput {
    name: string| null  ,
    email: string | null ,
    password: string | null
}
export interface AuthAction {
    type: "LOGIN" | "LOGOUT" | "SET_USER" | "FINISH_INITIALIZATION";
    payload?: {
        token?: string;
        user?: UserProps;
        
    };
}
export interface CommentInput {
    id?: 0,
    ticket_id: number | null,
    author_id?: 0,
    content:string,
    author_name?: string,
    author_email?: string,
    created_at?: string
}
export interface AddCommentInput {
    content: string| null,
    ticketId: number | null,
    token: string | null;
}



