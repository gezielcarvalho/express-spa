const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// Route to create a new user
router.post("/", userController.createUser);

// Route to get all users
router.get("/", userController.getAllUsers);

// Route to get a specific user by Id
router.get("/:id", userController.getUserById);

// Route to update a user
router.put("/:id", userController.updateUser);

// Route to delete a user
router.delete("/:id", userController.deleteUser);

module.exports = router;
