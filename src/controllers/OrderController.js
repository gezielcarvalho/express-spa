const Order = require("../models/Order");

// Controller for creating a new order
const createOrder = async (req, res) => {
  try {
    const {
      UserId,
      OrderDate,
      ProductsTotal,
      ShippingTotal,
      OrderTotal,
      ShippingAddress,
    } = req.body;
    const newOrder = await Order.create({
      UserId,
      OrderDate,
      ProductsTotal,
      ShippingTotal,
      OrderTotal,
      ShippingAddress,
    });
    // destructure the new order object to omit the __v and _id fields
    const { __v, _id, ...order } = newOrder.toObject();
    res.status(201).json({ Id: _id, ...order });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    // destructure the new order object to omit the __v and _id fields and include the Id field with the _id value
    const ordersFormatted = orders.map((order) => {
      const { __v, _id, ...orderFormatted } = order.toObject();
      return { Id: _id, ...orderFormatted };
    });
    res.status(200).json(ordersFormatted);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting a specific order by Id
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    // destructure the new order object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...orderFormatted } = order.toObject();
    res.status(200).json({ Id: _id, ...orderFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for updating an order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      UserId,
      OrderDate,
      ProductsTotal,
      ShippingTotal,
      OrderTotal,
      ShippingAddress,
    } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        UserId,
        OrderDate,
        ProductsTotal,
        ShippingTotal,
        OrderTotal,
        ShippingAddress,
      },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }
    const { __v, _id, ...orderFormatted } = updatedOrder.toObject();
    res.status(200).json({ Id: _id, ...orderFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for deleting an order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }
    const { __v, _id, ...orderFormatted } = deletedOrder.toObject();
    res.status(200).json({ Id: _id, ...orderFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
