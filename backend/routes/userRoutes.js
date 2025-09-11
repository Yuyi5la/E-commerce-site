import express from "express";
import { createUser ,updateUser } from "../controllers/userController.js";

const router = express.Router();


router.post("/users", createUser);
router.put("/users/:id", updateUser);


export default router;
