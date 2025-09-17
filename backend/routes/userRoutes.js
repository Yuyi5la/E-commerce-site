import express from "express";
import { createUser ,updateUser,getUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/users",authMiddleware,getUser)
router.post("/users",authMiddleware,adminMiddleware, createUser);
router.put("/users/:id", updateUser);
router.delete("/user/:id" , deleteUser)

export default router;
