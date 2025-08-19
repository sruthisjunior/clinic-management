# Clinic Management System

This is a full-stack project built with *Django (backend)* and *React (frontend)*.  
The system helps manage clinic operations including appointments, patients, and staff.

---

## 🚀 Features
- Django backend with REST API
- React frontend with modern UI
- SQLite database (default, can be switched to PostgreSQL/MySQL)
- Authentication system
- Modular project structure for easy scaling

---

## 🛠 Technologies Used
- *Backend:* Django, Django REST Framework
- *Frontend:* React, JavaScript, Bootstrap
- *Database:* SQLite (default)
- *Version Control:* Git & GitHub

---

## 📂 Project Structure
clinic-management/
│
├── clinic/              # Django backend
│   ├── manage.py
│   └── core/ …
│
├── clinic-frontend/     # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
---

## ⚡ How to Run

### Backend (Django)
```bash
cd clinic
python manage.py runserver

Frontend (React)
cd clinic-frontend
npm install
npm start