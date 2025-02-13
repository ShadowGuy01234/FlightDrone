import express from "express";
import heroRoutes from "./routes/heroRoutes.js";

const app = express();

// ... existing middleware
app.use("/api", heroRoutes);

// ... rest of the existing code

export default app; 