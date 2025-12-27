import { Routes, Route } from 'react-router-dom';
import Login from '../components/comments/auth/Login';
import Register from '../components/comments/auth/Register';
import About from '../pages/About';
import AddTicket from '../components/tickets/AddTicket';
import AddUser from '../components/users/AddUser';
import ShowTicketDetails from '../components/tickets/ShowTicketDetails';
import ShowUserDetails from '../components/users/ShowUserDetails';
import AddCommentComponent from '../components/comments/AddComment';
import TicketDetailsPage from '../pages/TicketDetailsPage';
import ProtectedRoute from '../guards/ProtectedRoute';
import Unauthorized from '../pages/Unauthorized';
import Logout from '../components/comments/auth/Logout';
import Dashboard from '../pages/Dashboard';
import Priority from '../components/priorities/Priority';
import AddPriorityApi from '../components/priorities/AddPriorityApi';
import ShowPriority from '../components/priorities/ShowPriority';
import ShowStatus from '../components/statuses/ShowStatus';
import DeleteTicket from '../components/tickets/DeleteTicket';
import AddStatus from '../components/statuses/AddStatus';
import Status from '../components/statuses/Status';
import NotFound from '../pages/notFount';

const AppRoutes = () => {
    return (
        <Routes> 
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tickets" element={<ShowTicketDetails />} />
                <Route path="/tickets/:id" element={<TicketDetailsPage />} />
                <Route path="/comments/add/:ticketID" element={<AddCommentComponent />} />
                <Route path="/logout" element={<Logout />} /> 
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
                <Route path="/tickets/new" element={<AddTicket />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/users" element={<ShowUserDetails />} />
                <Route path="/users/new" element={<AddUser />} />
                <Route path="/priority" element={<Priority />} />
                <Route path="/add-priority" element={<AddPriorityApi />} />
                <Route path="/show-priority" element={<ShowPriority/>} />
                <Route path="/status" element={<Status />} />
                <Route path="/add-status" element={<AddStatus />} />
                <Route path="/show-status" element={<ShowStatus/>} />
                <Route path="/tickets/delete/:id" element={<DeleteTicket />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
