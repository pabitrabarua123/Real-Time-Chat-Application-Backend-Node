# Real-Time Chat App - Backend

A simple real-time chat application backend built with Node.js, Express, TypeScript, MongoDB, and Socket.IO.

---

## Core Features

- Built with Node.js + Express + TypeScript
- Real-time communication using Socket.IO
- JWT Authentication & Authorization
- REST  APIs - User Login, Registration & Chat Message
- One-to-one messaging system
- Online/offline user tracking
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication

---

## Getting Started

Follow these steps to run the backend project locally.

### 1. Clone the repository

```bash
git clone https://github.com/pabitrabarua123/Real-Time-Chat-Application-Backend-Node.git
```

### 2. Navigate to the project folder

```bash
cd Real-Time-Chat-Application-Backend-Node
```

### 3. Install dependencies

```bash
npm install
```

### 4. Setup environment variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### 5. Start the development server

```bash
npm run dev
```

---

## Server Running

The backend server will start on:

```bash
http://localhost:5000
```

---

## Frontend Repository

Frontend setup and source code:

https://github.com/pabitrabarua123/Real-Time-Chat-Application-Frontend-React

### Note

Create MongoDB Atlas on the official website before starting the server.
Also start the frontend application to use the complete real-time chat system.