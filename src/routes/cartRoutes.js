const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

// Route to create a new cart
router.post("/", cartController.createCart);

// Route to get all carts
router.get("/", cartController.getAllCarts);

// Route to get a specific cart by Id
router.get("/:id", cartController.getCartById);

// Route to update a cart
router.put("/:id", cartController.updateCart);

// Route to delete a cart
router.delete("/:id", cartController.deleteCart);

module.exports = router;
