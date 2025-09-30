import express from "express";
import multer from "multer";
import { createProduct ,updateProducts ,getProducts, deleteProduct, getProductById  } from "../controllers/productController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();



const upload = multer({ storage: multer.memoryStorage() });


router.post("/products", authMiddleware,adminMiddleware,upload.array("files", 5), createProduct);
router.get ("/products", getProducts)
router.get("/products/:id", getProductById);
router.put("/products/:id", authMiddleware,adminMiddleware, updateProducts);
router.delete("/products/:id",authMiddleware,adminMiddleware, deleteProduct)



export default router;
