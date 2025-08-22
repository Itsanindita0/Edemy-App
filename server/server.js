import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { ClerkWebhooks } from "./controllers/webhooks.js";
import bodyParser from "body-parser";

// Initialize Express
const app = express();

// Connect to database
await connectDB();

// Middlewares
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("API Working"));

// Clerk requires raw body for signature verification
app.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }),
  ClerkWebhooks
);

// Port
const PORT = process.env.PORT || 5000;

// Run the application on the port
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
