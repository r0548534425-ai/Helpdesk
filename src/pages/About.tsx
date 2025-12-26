import React from 'react'
import { Link } from 'react-router-dom';
import Login from '../components/Login';

const About = () => {
   return (
    <>
        <div style={{ direction: 'rtl', maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
            <h1>מערכת תמיכה טכנית - TechSupport Pro</h1>
            
            <h2>מי אנחנו? 💼</h2>
            <p>
                TechSupport Pro היא חברה מובילה בתחום מתן שירותי תמיכה טכנית ללקוחות עסקיים ופרטיים.
                אנחנו פועלים כבר למעלה מ-10 שנים ומספקים פתרונות מהירים ויעילים לאלפי לקוחות ברחבי הארץ.
            </p>

            <h2>למה לבחור בנו? ⭐</h2>
            <ul>
                <li><strong>זמינות 24/6</strong> - צוות התמיכה שלנו זמין עבורך בכל שעה</li>
                <li><strong>מענה מהיר</strong> - זמן תגובה ממוצע של פחות משעה</li>
                <li><strong>מומחיות טכנית</strong> - צוות מנוסה ומיומן בכל תחומי הטכנולוגיה</li>
                <li><strong>מעקב שקוף</strong> - עקוב אחר הפניה שלך בזמן אמת</li>
                <li><strong>שביעות רצון גבוהה</strong> - 98% מהלקוחות שלנו ממליצים עלינו</li>
            </ul>

            <h2>השירותים שלנו 🛠️</h2>
            <p>
                אנחנו מטפלים במגוון רחב של בעיות טכניות: תקלות במחשבים, בעיות רשת, התקנת תוכנות,
                אבטחת מידע, גיבויים, ועוד. כל פניה מטופלת בידי מומחה ייעודי שידאג לפתור את הבעיה שלך במהירות.
            </p>

            <h2>יצירת קשר 📞</h2>
            <p>
                <strong>טלפון:</strong> 03-1234567<br/>
                <strong>אימייל:</strong> support@techsupport.co.il<br/>
                <strong>כתובת:</strong> רחוב הטכנולוגיה 15, תל אביב
            </p>

            <h2>שעות פעילות ⏰</h2>
            <p>
                אנחנו כאן בשבילך 24 שעות ביממה, 6 ימים בשבוע!<br/>
                צוות התמיכה שלנו מוכן לעזור לך בכל עת.
            </p>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Link to="/login">
                    <button style={{ 
                        padding: '15px 40px', 
                        fontSize: '18px', 
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px'
                    }}>
                        התחבר למערכת
                    </button>
                </Link>
            </div>
        </div>
    </>
   )
}
export default About;