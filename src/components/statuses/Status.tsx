
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
const Status: React.FC = () => {
    return  (
        <>
        <Header />
    <button>
    <Link to="/add-status">להוסיף סטטוס</Link>
   </button>
   <button>
    <Link to="/show-status">לצפות בסטטוסים</Link>
   </button>
    <Footer />
    </>
    );
}
export default Status;