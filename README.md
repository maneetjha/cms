
# 🎓 Course Selling Platform

A full-stack backend project for a course-selling website built using **Node.js**, **Express**, and **MongoDB**.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Validation**: Zod
- **Environment Management**: dotenv

---

## 🚀 Getting Started

### 📦 Installation

```bash
git clone https://github.com/your-username/course-selling-backend.git
cd course-selling-backend
npm install
```

### 🔑 Environment Variables

Create a `.env` file in the root directory with the following keys:

```
JWT_USER= your_jwt_secret
JWT_ADMIN= your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```

### ▶️ Running the App

```bash
npm run dev      # for development with nodemon
npm start        # for production
```

---

## 📁 API ROUTES

### 👤 User Routes (`/user`)

| Method | Path               | Middleware         | Description                                    |
|--------|--------------------|--------------------|------------------------------------------------|
| POST   | `/signup`          | ❌ None            | Register a new user                            |
| POST   | `/signin`          | ❌ None            | User login and token generation                |
| GET    | `/purchased`       | ✅ UserMiddleWare  | Get all purchased courses by the logged-in user|

---

### 🎓 Course Routes (`/course`)

| Method | Path               | Middleware         | Description                                    |
|--------|--------------------|--------------------|------------------------------------------------|
| GET    | `/preview`         | ❌ None            | Get all available courses                      |
| POST   | `/purchase`        | ✅ UserMiddleWare  | Purchase a course (requires user token)        |

---

### 🛠️ Admin Routes (`/admin`)

| Method | Path                        | Middleware           | Description                                   |
|--------|-----------------------------|----------------------|-----------------------------------------------|
| POST   | `/signup`                   | ❌ None              | Register a new admin                          |
| POST   | `/signin`                   | ❌ None              | Admin login and token generation              |
| GET    | `/courses/preview`          | ✅ AdminMiddleWare   | Get all courses created by the logged-in admin|
| POST   | `/courses`                  | ✅ AdminMiddleWare   | Create a new course                           |
| PUT    | `/courses`                  | ✅ AdminMiddleWare   | Update an existing course                     |
| DELETE | `/courses/:id`              | ✅ AdminMiddleWare   | Delete a course by ID                         |

---

## 🔐 Middleware

| Middleware       | Applied To                            | Purpose                             |
|------------------|---------------------------------------|-------------------------------------|
| `UserMiddleWare` | `/user/purchased`, `/course/purchase` | Verifies and attaches user from JWT |
| `AdminMiddleWare`| All `/admin/*` routes                 | Verifies and attaches admin from JWT|

---

## 📦 Dependencies

- `express`
- `mongoose`
- `jsonwebtoken`
- `bcrypt`
- `dotenv`
- `zod`
- `nodemon` (dev)

---


