// server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // Import admin order routes
import heroRoutes from "./routes/heroRoutes.js";
import adRoutes from "./routes/adRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

// Connect to the database
connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173/", // Frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/payment", orderRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/ad", adRoutes);
app.use("/api/employee", employeeRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
