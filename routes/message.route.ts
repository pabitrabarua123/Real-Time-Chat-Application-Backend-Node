import { Router } from "express";
import messageController from "../controllers/message.controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "All chat messages" });
});
router.get("/:senderId/:receiverId", messageController.getMessages);

export default router;