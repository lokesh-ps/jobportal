# Job Portal

A full-stack job portal application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It connects **Students** looking for jobs with **Recruiters** posting job openings.

## Tech Stack

### Frontend
- **React** – Component-based UI built with functional components and hooks
- **Vite** – Fast development server and build tooling
- **React Router** – Client-side routing and protected routes
- **Tailwind CSS** – Utility-first styling
- **Axios** – HTTP client for API communication

### Backend
- **Node.js** – JavaScript runtime
- **Express** – REST API server and routing
- **MongoDB + Mongoose** – NoSQL database with schemas and models
- **JWT (jsonwebtoken)** – Stateless authentication
- **bcryptjs** – Password hashing
- **cookie-parser** – Parse authentication cookies
- **CORS** – Cross-origin resource sharing
- **dotenv** – Environment variable management
- **nodemon** – Auto-restart during development

## Features

### User Roles
- **Student** – Browse jobs, apply to positions, track application status
- **Recruiter** – Register companies, post jobs, review applicants

### Core Features
- User registration and login with hashed passwords
- JWT-based authentication stored in cookies
- Role-based access (Student / Recruiter)
- Profile management (bio, skills, resume, profile photo)
- Company management (name, description, website, location, logo)
- Job posting and management
- Job search and filtering
- Job applications with status tracking (Pending / Accepted / Rejected)

## Project Structure

```
├── Backend/               # Node.js + Express API server
│   ├── controller/        # Route handlers / business logic
│   │   └── user.controller.js
│   ├── models/            # Mongoose schemas
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── utils/
│   │   └── db.js          # MongoDB connection
│   ├── index.js           # Server entry point
│   ├── .env               # Environment variables
│   └── package.json
│
├── Frontend/              # React application
└── README.md
```

## Database Models

| Model       | Description                                        |
|-------------|----------------------------------------------------|
| User        | Student/Recruiter accounts with profile            |
| Company     | Recruiter-owned company records                    |
| Job         | Job postings linked to a company and recruiter     |
| Application | Job applications with status tracking              |

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB (local instance or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will run at `http://localhost:5001`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The app will run at `http://localhost:5121`.

## Environment Variables

| Variable     | Description                              |
|--------------|------------------------------------------|
| `MONGO_URI`  | MongoDB connection string                |
| `PORT`       | Port for the backend server (default 5001) |
| `JWT_SECRET` | Secret key used to sign JWT tokens       |

## API Endpoints

| Method   | Endpoint                 | Description             |
|----------|--------------------------|-------------------------|
| POST     | `/api/v1/user/register`  | Register a new user     |
| POST     | `/api/v1/user/login`     | Login and get a token   |
| POST     | `/api/v1/user/logout`    | Logout the current user |
| PUT      | `/api/v1/user/profile/:userId` | Update user profile |
| GET/POST | `/api/v1/company`        | Company management      |
| GET/POST | `/api/v1/job`            | Job listing and posting |
| GET/POST | `/api/v1/application`    | Job applications        |

> Note: API routes are being actively developed. Refer to the `controller` and `models` folders for the current implementation.

## Scripts

### Backend
| Command         | Description                       |
|-----------------|-----------------------------------|
| `npm run dev`   | Start server with nodemon reload  |

## Roadmap
- [ ] Job search and advanced filtering
- [ ] Resume upload and file storage
- [ ] Recruiter dashboard for applicant management
- [ ] Deployment setup (Vercel + Render/Atlas)

## License
This project is for learning and practice purposes.
