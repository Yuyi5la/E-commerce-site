import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  checkoutCart,
} from "../controllers/cartController.js";

const router = express.Router();


router.post("/cart", authMiddleware, addToCart);              // Add product to cart
router.get("/cart", authMiddleware, getCart);                 // Get user's cart
router.put("/cart/:id", authMiddleware, updateCartItem);      // Update quantity
router.delete("/cart/:id", authMiddleware, removeCartItem);   // Remove product
router.post("/cart/checkout", authMiddleware, checkoutCart);  // Checkout

export default router;
