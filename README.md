# Message API

A RESTful API built with **Node.js**, **Express**, and **MongoDB** for user registration, contact management, and messaging between users. JWT is used for secure authentication, and rate limiting is applied to message sending.

---

## Features

- User registration and login with JWT
- Contact request system (send/accept)
- Messaging between accepted contacts
- Rate limiting to prevent spam (5 messages/min)
- Logging with Winston
- Ready to test with Postman

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **Bcrypt.js** (for password hashing)
- **Express-rate-limit**
- **Winston** (for logging)
- **dotenv**

---

## Folder Structure

message-api/ │ ├── config/ # MongoDB connection ├── controllers/ # Logic for auth, messages, contacts ├── middlewares/ # Auth check, rate limiter ├── models/ # User, Contact, Message schemas ├── routes/ # Route definitions ├── logs/ # Winston logs (error, combined) ├── .env # Environment variables ├── server.js # App entry point └── README.md

yaml

---

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Deeksha1108/Messaging_API.git
cd message-api
2. Install dependencies
bash
npm install
3. Create .env file in the root:
env
PORT=5000
MONGO_URI=mongodb://localhost:27017/Message_API
JWT_SECRET=supersecretkey
4. Start the server
bash
npm start
Server runs on: http://localhost:5000

Authentication Routes
Register
arduino
POST /auth/register
json
{
  "name": "Jolly",
  "email": "jolly@example.com",
  "password": "pass123"
}
Login
bash
POST /auth/login
json
{
  "email": "jolly@example.com",
  "password": "pass123"
}
Returns:

json
{
  "token": "your_jwt_token_here"
}
Contact API
All routes require the Authorization: Bearer <token> header.

Send Contact Request
bash
POST /contacts/request
json
{
  "receiverId": "<receiver_user_id>"
}
Accept Contact Request
bash
POST /contacts/accept
json
{
  "senderId": "<sender_user_id>"
}
Get All Accepted Contacts
bash
GET /contacts
Returns all accepted contacts with name and email.

Messaging API
Protected routes — use token.

Send Message
bash
POST /messages
json
{
  "receiverId": "<user_id>",
  "message": "Hello there!"
}
Rate-limited to 5 messages per minute per user.

Get Messages with a User
bash
GET /messages/:contactId?page=1&limit=10
Returns the message history between logged-in user and contact.

User Info
Get Current User
vbnet
GET /users/me
Returns the current user's data based on token.

Middleware
authMiddleware.js: Verifies JWT tokens

rateLimiter.js: Limits message POSTs (5 per minute)

Logging
Logs are stored using Winston:

logs/error.log: error logs

logs/combined.log: all logs

logs/exceptions.log: uncaught exceptions

Postman Testing Guide
Register two users via /auth/register

Log in both users and get their tokens via /auth/login

Use one to send a contact request to the other (/contacts/request)

Use the receiver’s token to accept the request (/contacts/accept)

Start sending messages (/messages)

Retrieve messages (/messages/:contactId)

Sample .env
env
PORT=5000
MONGO_URI=mongodb://localhost:27017/Message_API
JWT_SECRET=supersecretkey
Dependencies
json
{
  "bcryptjs": "^3.0.2",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "express-rate-limit": "^7.5.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.13.2",
  "morgan": "^1.10.0",
  "winston": "^3.17.0"
}
Author
Made with by [Deeksha]

License
This project is licensed under the MIT License.

yaml

---

Let me know if you also want:

- A `.gitignore` file
- A sample Postman collection (`.json`)
- Example seed data script
- Deployment steps (Heroku/Vercel)

Happy coding!