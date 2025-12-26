import React from 'react';
import { Link } from 'react-router-dom';


const NotFound: React.FC = () => {
    return (
        <>
           
            <div>
                <h1>404</h1>
                <h2>הדף לא נמצא</h2>
                <p>מצטערים, הדף שחיפשת לא קיים במערכת.</p>
                <Link to="/dashboard">חזרה לדף הבית</Link>
            </div>
        </>
    );
};

export default NotFound;
