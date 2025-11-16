import { Request, Response } from "express";
import Cart from "../models/Cart";

// Controller for creating a new cart
export const createCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { UserId, ProductQuantity, Status } = req.body;
    const newCart = await Cart.create({ UserId, ProductQuantity, Status });
    // destructure the new cart object to omit the __v and _id fields
    const { __v, _id, ...cart } = newCart.toObject();

    res.status(201).json({ Id: _id, ...cart });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting all carts
export const getAllCarts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const carts = await Cart.find();
    // destructure the new cart object to omit the __v and _id fields and include the Id field with the _id value
    const cartsFormatted = carts.map((cart) => {
      const { __v, _id, ...cartFormatted } = cart.toObject();
      return { Id: _id, ...cartFormatted };
    });
    res.status(200).json(cartsFormatted);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch carts." });
  }
};

// Controller for getting a specific cart by Id
export const getCartById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }
    // destructure the new cart object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...cartFormatted } = cart.toObject();
    res.status(200).json({ Id: _id, ...cartFormatted });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the cart." });
  }
};

// Controller for updating a cart
export const updateCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cartId = req.params.id;
    const { UserId, ProductQuantity, Status } = req.body;
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { UserId, ProductQuantity, Status },
      { new: true }
    );
    if (!updatedCart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }
    const { __v, _id, ...cartFormatted } = updatedCart.toObject();
    res.status(200).json({ Id: _id, ...cartFormatted });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the cart." });
  }
};

// Controller for deleting a cart
export const deleteCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      res.status(404).json({ message: "Cart not found." });
      return;
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the cart." });
  }
};
