import { Router } from "express";
import {
	changeEmail,
	changePassword,
	checkEmail,
	login,
	logout,
	me,
	registerUser
} from "../controllers/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/me", me);
router.post("/check-email", checkEmail);
router.post("/change-email/:id", changeEmail);
router.post("/change-password/:id", changePassword);

export const authRoutes = router;
