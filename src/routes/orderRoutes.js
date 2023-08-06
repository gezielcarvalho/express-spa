const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");

// Route to create a new order
router.post("/", orderController.createOrder);

// Route to get all orders
router.get("/", orderController.getAllOrders);

// Route to get a specific order by Id
router.get("/:id", orderController.getOrderById);

// Route to update an order
router.put("/:id", orderController.updateOrder);

// Route to delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
