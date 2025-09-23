import express from "express";
import {
  createUser,
  updateUser,
  getUser,
  getMe,  
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/users/me", authMiddleware, getMe); 

// Get all users (admin only, for security)
router.get("/users", authMiddleware, adminMiddleware, getUser);

// Create new user (admin only)
router.post("/users", authMiddleware, adminMiddleware, createUser);

// Update user role (admin only)
router.patch("/users/:id/role", authMiddleware, adminMiddleware, updateUserRole);

// Update user (admin only)
router.put("/users/:id", authMiddleware, adminMiddleware, updateUser);

// Delete user (admin only)
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;
