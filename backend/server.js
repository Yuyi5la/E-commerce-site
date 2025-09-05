import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});