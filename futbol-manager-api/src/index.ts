import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { register } from "node:module";
import registerRoutes from "./routes/registerRoutes.js";

const app = express();
const PORT = 3000;

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", // Tu URL de React
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware
app.use(express.json());

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

// Sync models with database (development only)
sequelize.sync({ alter: true }).catch((error) => {
  console.error("Error syncing database:", error);
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Futbol Manager API!" });
});

// Register coutes (publicas)
app.use("/api", registerRoutes);

// Auth routes
app.use("/api", authRoutes);

// User routes
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});