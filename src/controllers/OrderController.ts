import { Request, Response } from "express";
import Order from "../models/Order";

// Controller for creating a new order
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      UserId,
      OrderCartOrigin,
      OrderTotalQuantity,
      OrderTotalShipping,
      OrderTotalProducts,
      OrderTotalTaxes,
      OrderDate,
      ShippingAddress,
    } = req.body;
    const newOrder = await Order.create({
      UserId,
      OrderCartOrigin,
      OrderTotalQuantity,
      OrderTotalShipping,
      OrderTotalProducts,
      OrderTotalTaxes,
      OrderDate,
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
export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
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
export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found." });
      return;
    }
    // destructure the new order object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...orderFormatted } = order.toObject();
    res.status(200).json({ Id: _id, ...orderFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for updating an order
export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const {
      UserId,
      OrderCartOrigin,
      OrderTotalQuantity,
      OrderTotalShipping,
      OrderTotalProducts,
      OrderTotalTaxes,
      OrderDate,
      ShippingAddress,
    } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        UserId,
        OrderCartOrigin,
        OrderTotalQuantity,
        OrderTotalShipping,
        OrderTotalProducts,
        OrderTotalTaxes,
        OrderDate,
        ShippingAddress,
      },
      { new: true }
    );
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found." });
      return;
    }
    const { __v, _id, ...orderFormatted } = updatedOrder.toObject();
    res.status(200).json({ Id: _id, ...orderFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for deleting an order
export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      res.status(404).json({ message: "Order not found." });
      return;
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};
