// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cartRoutes = require("./routes/cartRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const commentRoutes = require("./routes/commentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/carts", cartRoutes);
app.use("/cartitems", cartItemRoutes);
app.use("/comments", commentRoutes);
app.use("/orders", orderRoutes);
// app.use("/products", productRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
