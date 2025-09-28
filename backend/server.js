import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import prisma from "./prismaClient.js";

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman
    if (/\.vercel\.app$/.test(origin)) {
      return callback(null, true); // allow any Vercel frontend
    }
    callback(new Error("Not allowed by CORS")); // block others
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
