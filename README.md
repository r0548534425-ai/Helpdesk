# 🎫 מערכת Helpdesk - ניהול טיקטים

אפליקציה מלאה לניהול פניות במערכת Helpdesk. המערכת מאפשרת ללקוחות לפתוח טיקטים, לסוכנים לטפל בהם, ולמנהלים לנהל את כל המערכת.

---

## 📋 תוכן עניינים

- [תיאור המערכת](#-תיאור-המערכת)
- [תפקידי משתמשים](#-תפקידי-משתמשים)
- [טכנולוגיות](#-טכנולוגיות)
- [התקנה והרצה](#-התקנה-והרצה)
- [מבנה הפרויקט](#-מבנה-הפרויקט)
- [ניתובים](#-ניתובים)
- [API](#-api)

---

## 🎯 תיאור המערכת

מערכת Helpdesk מתקדמת המאפשרת:
- ✅ לקוחות יכולים לפתוח טיקטים ולעקוב אחריהם
- ✅ סוכנים מטפלים בטיקטים שהוקצו להם
- ✅ מנהלים מנהלים את כל המערכת: משתמשים, סטטוסים, עדיפויות
- ✅ מערכת תגובות מלאה לכל טיקט
- ✅ ניהול הרשאות מתקדם (JWT)

---

## 👥 תפקידי משתמשים

### 🔵 Customer (לקוח)
- רואה **רק** טיקטים שהוא יצר
- יכול לפתוח טיקט חדש
- יכול להוסיף תגובות בטיקטים שלו
- **נתיב מיוחד:** `/tickets/new`

### 🟢 Agent (סוכן)
- רואה **רק** טיקטים שהוקצו אליו
- יכול לעדכן סטטוס טיקט
- יכול להוסיף תגובות
- **אין גישה:** ליצירת טיקטים חדשים

### 🔴 Admin (מנהל)
- רואה את **כל** הטיקטים במערכת
- יכול לשנות סטטוסים
- יכול להקצות טיקטים ל-Agents
- יכול להוסיף משתמשים חדשים
- יכול להוסיף סטטוסים ועדיפויות חדשים
- **גישה מלאה** לכל חלקי המערכת

---

## 🛠 טכנולוגיות

### Frontend
- **React 18** - ספריית UI
- **TypeScript** - Type safety
- **React Router v6** - ניתוב
- **Context API + useReducer** - ניהול state גלובלי
- **React Query (TanStack Query)** - ניהול server state
- **Axios** - HTTP requests
- **SweetAlert** - התראות יפות
- **React Hook Form** - ניהול טפסים
- **Vite** - Build tool מהיר

### Backend (מוכן מראש)
- **Node.js + Express** - שרת API
- **JWT** - אימות משתמשים
- **Swagger** - תיעוד API

---

## 🚀 התקנה והרצה

### דרישות מוקדמות
- Node.js (גרסה 18+)
- npm או yarn

### 1️⃣ הורדת הפרויקט
```bash
git clone <repository-url>
cd react-project
```

### 2️⃣ התקנת תלויות
```bash
npm install
```

### 3️⃣ הפעלת השרת (Backend)
```bash
# הורד את השרת מ:
git clone https://github.com/sarataber/helpdesk-api
cd helpdesk-api
npm install
npm start
```
השרת ירוץ על `http://localhost:4000`

### 4️⃣ הפעלת הפרויקט (Frontend)
```bash
npm run dev
```
האפליקציה תרוץ על `http://localhost:5174`

---

## 📁 מבנה הפרויקט

```
src/
├── components/           # קומפוננטות React
│   ├── Comments/        # ניהול תגובות
│   ├── priorities/      # ניהול עדיפויות
│   ├── statuses/        # ניהול סטטוסים
│   ├── Tickets/         # ניהול טיקטים
│   ├── users/           # ניהול משתמשים
│   ├── Header.tsx       # כותרת עליונה
│   ├── Login.tsx        # התחברות
│   ├── Logout.tsx       # התנתקות
│   └── Register.tsx     # הרשמה
│
├── context/             # State Management
│   └── Slice.tsx        # Context + Reducer
│
├── guards/              # Route Protection
│   └── ProtectedRoute.tsx
│
├── pages/               # דפים ראשיים
│   ├── About.tsx        # דף אודות
│   ├── Dashboard.tsx    # לוח בקרה ראשי
│   └── Unauthorized.tsx # דף גישה נדחתה
│
├── Routes/              # ניתובים
│   └── AppRoutes.tsx    # כל הניתובים
│
├── services/            # קריאות API
│   ├── AuthService.ts   # אימות
│   ├── CommentService.ts
│   ├── PriorityService.ts
│   ├── StatusService.ts
│   ├── TicketService.ts
│   └── userService.ts
│
├── types/               # TypeScript Types
│   └── index.ts         # כל ה-interfaces
│
├── App.tsx              # קומפוננטה ראשית
└── main.tsx             # נקודת כניסה
```

---

## 🔗 ניתובים

### ניתובים ציבוריים
| נתיב | תיאור |
|------|-------|
| `/` | דף אודות |
| `/login` | התחברות למערכת |
| `/register` | הרשמה למערכת |
| `/unauthorized` | גישה נדחתה |

### ניתובים מוגנים (דורשים התחברות)
| נתיב | תיאור | הרשאות |
|------|--------|---------|
| `/dashboard` | לוח בקרה ראשי | כולם |
| `/tickets` | רשימת טיקטים | כולם |
| `/tickets/:id` | פרטי טיקט + תגובות | כולם |
| `/tickets/new` | יצירת טיקט חדש | **Customer בלבד** |
| `/comments/add/:ticketID` | הוספת תגובה | כולם |
| `/logout` | התנתקות | כולם |

### ניתובים למנהלים בלבד
| נתיב | תיאור |
|------|-------|
| `/users` | רשימת משתמשים |
| `/users/new` | הוספת משתמש |
| `/priority` | ניהול עדיפויות |
| `/add-priority` | הוספת עדיפות |
| `/show-priority` | הצגת עדיפויות |
| `/status` | ניהול סטטוסים |
| `/add-status` | הוספת סטטוס |
| `/show-status` | הצגת סטטוסים |

---

## 🌐 API

### Base URL
```
http://localhost:4000
```

### Endpoints עיקריים

#### אימות
- `POST /auth/register` - הרשמה
- `POST /auth/login` - התחברות

#### טיקטים
- `GET /tickets` - קבלת כל הטיקטים (לפי הרשאות)
- `GET /tickets/:id` - קבלת טיקט ספציפי
- `POST /tickets` - יצירת טיקט חדש
- `PATCH /tickets/:id` - עדכון טיקט
- `DELETE /tickets/:id` - מחיקת טיקט (admin)

#### תגובות
- `GET /tickets/:id/comments` - קבלת תגובות לטיקט
- `POST /comments` - הוספת תגובה

#### סטטוסים ועדיפויות
- `GET /statuses` - קבלת סטטוסים
- `POST /statuses` - יצירת סטטוס (admin)
- `GET /priorities` - קבלת עדיפויות
- `POST /priorities` - יצירת עדיפות (admin)

#### משתמשים
- `GET /users` - קבלת משתמשים (admin)
- `POST /users` - יצירת משתמש (admin)

---

## 🔐 אבטחה

- **JWT Token** - נשמר ב-localStorage
- **Route Guards** - חסימת גישה לפי role
- **Authorization Header** - נשלח בכל בקשה
- **Protected Routes** - ניתובים מוגנים

---

## 🎨 Features

- ✅ **Responsive Design** - תומך בכל המסכים
- ✅ **Loading States** - אינדיקטורי טעינה
- ✅ **Error Handling** - טיפול מקצועי בשגיאות
- ✅ **Empty States** - הודעות "אין נתונים"
- ✅ **Form Validation** - אימות טפסים עם React Hook Form
- ✅ **Toast Notifications** - התראות יפות עם SweetAlert
- ✅ **Type Safety** - TypeScript בכל הפרויקט

---

## 📝 הערות חשובות

1. **אין לשנות את השרת** - השרת ניתן כמות שהוא
2. **JWT חובה** - כל בקשה דורשת token בheader
3. **Role-based access** - כל תפקיד רואה רק מה שמותר לו
4. **404 Page** - דף שגיאה לניתובים לא קיימים

---

## 👨‍💻 פיתוח

### הפעלת מצב פיתוח
```bash
npm run dev
```

### בנייה לייצור
```bash
npm run build
```

### הרצת Preview
```bash
npm run preview
```

---

## 📞 תמיכה

לשאלות ובעיות, פנה למפתח הראשי.

---

## 📄 רישיון

פרויקט זה נוצר למטרות לימוד.

---

**🎉 בהצלחה!**