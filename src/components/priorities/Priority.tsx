import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
const Priority: React.FC = () => {
    return  (
        <>
        <Header />
    <button>
    <Link to="/add-priority">להוסיף עדיפות</Link>
   </button>
   <button>
    <Link to="/show-priority">לצפות בעדיפויות</Link>
   </button>
    <Footer />
    </>
    );
}
export default Priority;