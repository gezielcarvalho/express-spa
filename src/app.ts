// Import required modules
import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fileUploadInstance from "express-fileupload";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

import cartRoutes from "./routes/cartRoutes";
import cartItemRoutes from "./routes/cartItemRoutes";
import commentRoutes from "./routes/commentRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app: Express = express();
const fileUpload = fileUploadInstance();

// Serve static files
app.use(express.static("public"));

// Enable CORS
app.use(cors());
app.options("*", cors());

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Middleware
app.use(express.json());
app.use(fileUpload);

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/users", userRoutes);
app.use("/carts", cartRoutes);
app.use("/cartitems", cartItemRoutes);
app.use("/comments", commentRoutes);
app.use("/orders", orderRoutes);
app.use("/products", productRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API!");
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
