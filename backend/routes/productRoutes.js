import express from "express";
import multer from "multer";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

// Configure multer to store files temporarily in "uploads/"
const upload = multer({ dest: "uploads/" });


router.post("/products", upload.array("files", 5), createProduct);

export default router;
