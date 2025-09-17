import express from "express";
import multer from "multer";
import { createProduct ,updateProducts ,getProducts, deleteProduct } from "../controllers/productController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Configure multer to store files temporarily in "uploads/"
const upload = multer({ dest: "uploads/" });


router.post("/products", authMiddleware,adminMiddleware,upload.array("files", 5), createProduct);
router.get ("/products",authMiddleware, getProducts)
router.put("/products/:id", authMiddleware,adminMiddleware, updateProducts);
router.delete("/products/:id",authMiddleware,adminMiddleware, deleteProduct)



export default router;
