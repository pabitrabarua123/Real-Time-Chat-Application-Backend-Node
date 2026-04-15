import { Router } from "express";
import userController from "../controllers/user.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/profile", protect, userController.getUserProfile);

export default router;