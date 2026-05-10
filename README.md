# HRMS - Human Resource Management System

A complete full-stack MERN (MongoDB, Express.js, React.js, Node.js) HRMS application featuring role-based access control, attendance management, leave management, and dashboard analytics.

## Features

- **Authentication & Authorization**: JWT-based auth with HTTP-only cookies. Role-based access (Admin & Employee).
- **Dashboard**: Aggregated statistics for both admins and employees.
- **Employee Management**: Admins can add, edit, and remove employees.
- **Attendance Tracking**: Mark daily attendance. Admins can view all records and mark on behalf of employees.
- **Leave Management**: Employees can apply for leaves. Admins can approve or reject them.

## Tech Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- Lucide React Icons
- React Toastify

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs
- express-validator

## Setup Instructions

### 1. Clone the repository (if not already done)
Ensure you are in the `hrms` workspace.

### 2. Configure Environment Variables
You will need to set up `.env` files in both the `backend` and `frontend` directories. They have been created with defaults for a local environment.

**Backend (`backend/.env`):**
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hrms
JWT_SECRET=supersecretkey_hrms_2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Frontend (`frontend/.env`):**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

Open a terminal and install dependencies for the backend:
```bash
cd backend
npm install
```

Open another terminal and install dependencies for the frontend:
```bash
cd frontend
npm install
```

### 4. Run the Seed Script
This will create a default Admin user in the database. Ensure MongoDB is running locally.
```bash
cd backend
node seed.js
```
*Default Admin Credentials:*
- Email: `admin@hrms.com`
- Password: `Admin@123`

### 5. Start the Application

**Start the Backend (from the `backend` directory):**
```bash
npm run dev
```
*(You may need to add `"dev": "nodemon server.js"` to your `backend/package.json` scripts if not already present. Otherwise, run `npx nodemon server.js`)*

**Start the Frontend (from the `frontend` directory):**
```bash
npm run dev
```

### 6. Access the Application
Open your browser and navigate to `http://localhost:5173`.
Log in using the seeded Admin credentials. You can then start adding new employees from the Employees tab.
