import { Request, Response } from "express";
import Message from "../models/Message";

const messageController = {
    // Fetch chat between two users
   getMessages: async (req: Request, res: Response) => {
     const senderId = req.params.senderId;
     const receiverId = req.params.receiverId;

     console.log("Fetching messages between:", senderId, receiverId);

     try {
       const messages = await Message.find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
       }).sort({ createdAt: 1 });

       res.json(messages);
     } catch (err) {
       res.status(500).json({ error: "Failed to fetch messages" });
     }
   },
};

export default messageController;