import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

// import userRoutes from "./routes/userRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// routes
// app.use("/api/users", userRoutes);
// app.use("/api/projects", projectRoutes);
// app.use("/api/tasks", taskRoutes);

// fallback PORT
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
