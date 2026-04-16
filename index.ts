import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnect";
import userRoutes from "./routes/user.route";
import messageRoutes from "./routes/message.route";
import Message from "./models/Message";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Wellcome to realtime chat application backend, API is working!" });
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
  },
});

const onlineUsers = new Map(); // userId -> socketId

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
  // Save to DB
  const message = await Message.create({
    senderId,
    receiverId,
    text,
  });

  // Send to receiver if online
  const receiverSocketId = onlineUsers.get(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("receiveMessage", message);
  }

  // Also send back to sender (optional)
  socket.emit("receiveMessage", message);
});

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});



// define port
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});