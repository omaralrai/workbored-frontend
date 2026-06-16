# 🌐 WorkBored Frontend (React)

This is the **frontend** for WorkBored — a full-stack job board web application built with **React + Vite**.

## 🎯 Description

The app allows two types of users:

- 👤 **Job Seekers:**
  - Browse all active job listings
  - View job details and apply
  - Track application statuses in a personal dashboard
  - Manage their profile and skills

- 🏢 **Employers:**
  - Post and manage job listings
  - Review applications and update statuses
  - Add feedback for each applicant
  - Manage their company profile

Login and signup are included with role-based routing (`seeker` / `employer`). Sessions are persisted using `localStorage`. Data is fetched from the Express backend via the Fetch API.

---

## 🧑‍💻 User Requirements

1. **Login or Sign Up** with an email and password
2. On sign up, choose your role: `seeker` or `employer`
3. **Employer** users can:
   - Post new job listings
   - Edit or close existing listings
   - Review applicants and move them through statuses
4. **Seeker** users can:
   - Browse and apply to jobs
   - Withdraw pending applications
   - Update their profile, skills, and professional summary
5. The app remembers login sessions using `localStorage`

---

## 🛠️ Technologies

- React 18
- Vite
- React Router v7
- Fetch API
- LocalStorage (for session persistence)

---

## 📄 Pages

| Page | Route | Access |
| :--- | :---- | :----- |
| Home | `/` | Public |
| Job Listings | `/jobs` | Public |
| Job Detail | `/jobs/:id` | Public |
| Company Profile | `/companies/:id` | Public |
| Sign In | `/signin` | Public |
| Register | `/register` | Public |
| Seeker Dashboard | `/seeker/dashboard` | Seeker only |
| Seeker Applications | `/seeker/applications` | Seeker only |
| Seeker Profile | `/seeker/profile` | Seeker only |
| Employer Dashboard | `/employer/dashboard` | Employer only |
| Employer Applications | `/employer/applications` | Employer only |
| Post a Job | `/employer/post-job` | Employer only |
| Company Setup | `/employer/company-setup` | Employer only |

---

## 🚀 Getting Started

```bash
cd workbored-frontend
npm install
npm run dev
```

Create a `.env` file (copy from `.env.sample`):

```
VITE_API_URL=http://localhost:5000/api
```

Make sure the backend is running on port 5000 before starting the frontend.
