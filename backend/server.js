import  express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js"
import prisma from "./prismaClient.js"; // centralized prisma


dotenv.config();

const app = express();

// Middleware
app.use(express.json());


app.use(cors({
  origin: "https://e-commerce-site-smoky-ten.vercel.app", // frontend URL
  credentials: true, // allow cookies/auth headers
}));

// Routes
app.use ("/api/auth",authRoutes)
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);


// health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
