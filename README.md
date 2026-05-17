# 🏥 Doctor Appointment Booking System (MERN Stack)

A full-stack doctor appointment booking web application built with the MERN stack. The platform supports 3 levels of authentication — Patient, Doctor, and Admin — with online payment integration.


---

## 🧠 Project Overview

This application simulates a real-world hospital/clinic booking system where:

- **Patients** can register, browse doctors, book appointments, pay online, and manage their bookings
- **Doctors** can log in, view their appointments, check earnings, and update their profile
- **Admins** can manage all appointments and doctor profiles from a dedicated dashboard

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router DOM
- Context API / State Management
- Axios

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (Mongoose)

**Authentication:**
- JWT (JSON Web Token)
- bcrypt (password hashing)

**Payment:**
- Paypal

---

## 🔐 Key Features

### 👤 Patient Features
- Register & login securely (JWT)
- Browse available doctors by specialty
- Book appointments with preferred doctors
- Pay appointment fees online
- View and manage booked appointments

### 🩺 Doctor Features
- Doctor login & dashboard
- View upcoming appointments
- Track earnings
- Update profile and availability

### 🛠️ Admin Features
- Admin dashboard
- Manage all doctors (add / edit / delete)
- View and manage all appointments
- Monitor platform activity

---

## 📁 Project Structure
```bash
Doctor-Appointments-Booking-System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── assets/
│
└── admin/
    └── src/
        ├── components/
        ├── pages/
        └── context/
```
---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/omarNaifer12/Doctor-Appointments-Booking-System.git
cd Doctor-Appointments-Booking-System
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_admin_password
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET_KEY=your_paypal_secret_key
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Run the backend:

```bash
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

### 4. Admin panel setup

```bash
cd admin
npm install
npm run dev
```
