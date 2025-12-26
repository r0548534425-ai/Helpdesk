import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    return (
        <div style={{ 
            textAlign: 'center', 
            marginTop: '50px',
            direction: 'rtl'
        }}>
            <h1>⛔ אין הרשאה</h1>
            <p>אין לך הרשאה לגשת לדף זה</p>
            <Link to="/dashboard">
                <button >
                    חזור לדף הבית
                </button>
            </Link>
        </div>
    );
}

export default Unauthorized;
