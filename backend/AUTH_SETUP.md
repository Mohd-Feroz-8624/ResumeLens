# ResumeLens Backend - Auth Setup Guide

## Overview

This guide will help you set up and run the authentication system for ResumeLens with signin and signup functionality.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (for cloud database) OR local MongoDB
- npm or yarn package manager

## Step 1: Environment Configuration

1. **Copy the example environment file:**

   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your values:**

   ```env
   # MongoDB Connection
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/resumelens?retryWrites=true&w=majority

   # Generate a strong JWT secret (e.g., using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

   PORT=3000
   NODE_ENV=development
   ```

3. **How to get MongoDB URI:**
   - Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster and database
   - Click "Connect" → "Connect your application"
   - Copy the connection string and replace `username:password` with your credentials
   - Add the database name: `.../resumelens?retryWrites=true&w=majority`

## Step 2: Install Dependencies

```bash
cd backend
npm install
```

## Step 3: Run the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

You should see:

```
🚀 Server running at http://localhost:3000
⏳ Connecting to MongoDB...
✅ Connected to MongoDB
```

## API Endpoints

### Authentication Endpoints

#### 1. **Register (Sign Up)**

- **URL:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Account created successfully. Welcome to ResumeLens!",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### 2. **Login (Sign In)**

- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:** Same as register (returns token and user info)

#### 3. **Get Profile** _(Protected - Requires Token)_

- **URL:** `GET /api/auth/profile`
- **Headers:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Response:**
  ```json
  {
    "message": "Profile retrieved successfully.",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
  ```

#### 4. **Verify Token** _(Protected - Requires Token)_

- **URL:** `POST /api/auth/verify-token`
- **Headers:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Response:**
  ```json
  {
    "message": "Token is valid.",
    "isValid": true,
    "user": {
      /* user object */
    }
  }
  ```

#### 5. **Logout**

- **URL:** `POST /api/auth/logout`
- **Headers:**
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Note:** JWT logout is stateless. Delete the token on the client side.

## Password Requirements

- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 number
- Example: `SecurePass123` ✅, `password` ❌

## Testing with Postman/Thunder Client

1. **Create New Request → POST**
2. **URL:** `http://localhost:3000/api/auth/login`
3. **Headers:** `Content-Type: application/json`
4. **Body:**
   ```json
   {
     "email": "test@example.com",
     "password": "TestPass123"
   }
   ```
5. Copy the returned `token` for authenticated requests

## Frontend Integration

In your React frontend, store the token in localStorage after login:

```javascript
// After successful login
const response = await fetch("http://localhost:3000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

const data = await response.json();
localStorage.setItem("token", data.token);
```

Use token for protected routes:

```javascript
const token = localStorage.getItem("token");
const response = await fetch("http://localhost:3000/api/auth/profile", {
  headers: { Authorization: `Bearer ${token}` },
});
```

## Troubleshooting

| Issue                     | Solution                                                 |
| ------------------------- | -------------------------------------------------------- |
| `MONGO_URI not provided`  | Add `MONGO_URI` to `.env` file                           |
| `JWT_SECRET not provided` | Add `JWT_SECRET` to `.env` file                          |
| MongoDB connection fails  | Check IP whitelist in MongoDB Atlas or use local MongoDB |
| Port 3000 already in use  | Change `PORT` in `.env` or: `PORT=3001 npm run dev`      |
| CORS errors               | CORS is enabled by default for all origins               |

## Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens expire after 7 days
- ✅ Email validation included
- ✅ Password strength validation enforced
- ⚠️ Use environment variables for secrets
- ⚠️ Change `JWT_SECRET` in production
- ⚠️ Enable HTTPS in production
- ⚠️ Restrict CORS to your frontend domain in production

## File Structure

```
backend/
├── .env                    (Create from .env.example)
├── .env.example           (Template)
├── server.js              (Main server file)
├── middleware/
│   └── auth.js            (JWT verification)
├── models/
│   └── User.js            (User schema with bcrypt)
├── routes/
│   └── auth.js            (Auth endpoints)
└── utils/
    ├── validators.js      (Input validation)
    └── errorHandler.js    (Error handling)
```

## Next Steps

- [ ] Set up MongoDB Atlas database
- [ ] Create `.env` file with credentials
- [ ] Run `npm install`
- [ ] Start server with `npm run dev`
- [ ] Test endpoints with Postman
- [ ] Connect frontend to backend
- [ ] Implement logout on frontend
- [ ] Add refresh token functionality (optional)
