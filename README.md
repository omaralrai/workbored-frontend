# WorkBored Frontend (React + Vite)

This is the **frontend** for WorkBored — a full-stack job board web application built with **React + Vite**.

## Description

The app allows two types of users:

- **Job Seekers** — browse listings, view job details, apply, track application statuses, manage profile, skills, and resume
- **Employers** — post and manage job listings, review and filter applicants, view full applicant profiles, update company info

Login and sign-up are included with role-based routing (`seeker` / `employer`). Sessions are persisted using `localStorage`. All data is fetched from the Express backend via the Fetch API.

---

## Technologies

- React 18
- Vite
- React Router v7
- Fetch API
- localStorage (session persistence)

---

## Getting Started

```bash
cd workbored-frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173`. Make sure the backend is running on port 5000 first.

---

## Test Credentials

Use these after running `node run_seed.mjs` in the backend.

### Employers

| Company    | Email                   | Password      |
|------------|-------------------------|---------------|
| Aramex     | admin@aramex.com        | aramex123     |
| Mawdoo3    | admin@mawdoo3.com       | mawdoo3123    |
| Optimiza   | admin@optimiza.com      | optimiza123   |
| Estarta    | admin@estarta.com       | estarta123    |
| MenaITech  | admin@menaitech.com     | menatech123   |
| Hikma      | admin@hikma.com         | hikma123      |

### Seekers

| Name           | Email                        | Password    | Notes                          |
|----------------|------------------------------|-------------|--------------------------------|
| John Doe       | john.doe@university.edu      | john123     | Applications in every status   |
| Sarah Khalil   | sarah.khalil@email.com       | sarah123    |                                |
| Omar Mansour   | omar.mansour@email.com       | omar123     |                                |
| Lina Habash    | lina.habash@email.com        | lina123     |                                |
| Yousef Awad    | yousef.awad@email.com        | yousef123   |                                |
| Rana Nasser    | rana.nasser@email.com        | rana123     |                                |
| Khaled Atiyeh  | khaled.atiyeh@email.com      | khaled123   |                                |
| Nour Haddad    | nour.haddad@email.com        | nour123     |                                |
| Maya Sabbagh   | maya.sabbagh@email.com       | maya123     |                                |

---

## Pages

| Page                  | Route                      | Access        |
|-----------------------|----------------------------|---------------|
| Home                  | `/`                        | Public        |
| Job Listings          | `/jobs`                    | Public        |
| Job Detail            | `/jobs/:id`                | Public        |
| Company Profile       | `/companies/:id`           | Public        |
| Sign In               | `/signin`                  | Public        |
| Register              | `/register`                | Public        |
| Seeker Dashboard      | `/seeker/dashboard`        | Seeker only   |
| Seeker Applications   | `/seeker/applications`     | Seeker only   |
| Seeker Profile        | `/seeker/profile`          | Seeker only   |
| Employer Dashboard    | `/employer/dashboard`      | Employer only |
| Employer Applications | `/employer/applications`   | Employer only |
| My Job Posts          | `/employer/jobs`           | Employer only |
| Post a Job            | `/employer/post-job`       | Employer only |
| Company Setup         | `/employer/company-setup`  | Employer only |

---

## Features by Role

### Seeker
- Browse all active job listings with search and filter
- View full job detail and apply with one click
- Track all applications with live status updates and employer feedback
- Edit personal info, job title, location, LinkedIn
- Add and remove skills
- Upload or replace resume (PDF / Word, max 5 MB)
- Update professional summary

### Employer
- Post new jobs with full details (type, mode, salary, requirements)
- View all job posts with applicant counts and status controls
- Change job status (Active / Paused / Closed) from the jobs table
- Delete job posts
- Review all applicants — click **View Application** to see a seeker's full profile (skills, summary, resume, contact info)
- Move applicants through statuses: Pending → Under Review → Interview → Approved / Rejected
- Add private feedback visible to the applicant
- Edit company profile (name, industry, size, founded year, website, HQ, about)
