import { Router } from "express";
import {
	changeEmail,
	changePassword,
	login,
	logout,
	me,
	registerUser
} from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/me", me);
router.patch("/email", requireAuth, changeEmail);
router.patch("/password", requireAuth, changePassword);

export const authRoutes = router;
