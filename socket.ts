// src/socket.ts

import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "./types/socket";
import Message from "./models/Message";

export const initSocket = (server: any) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    socket.on("send_message", async (data) => {
      const savedMessage = await Message.create(data);

      io.to(data.roomId).emit("receive_message", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};