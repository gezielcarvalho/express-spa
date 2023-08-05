const Cart = require("../models/Cart");

// Controller for creating a new cart
const createCart = async (req, res) => {
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
const getAllCarts = async (req, res) => {
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
const getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    // destructure the new cart object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...cartFormatted } = cart.toObject();
    res.status(200).json({ Id: _id, ...cartFormatted });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the cart." });
  }
};

// Controller for updating a cart
const updateCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const { UserId, ProductQuantity, Status } = req.body;
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      { UserId, ProductQuantity, Status },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    const { __v, _id, ...cartFormatted } = updatedCart.toObject();
    res.status(200).json({ Id: _id, ...cartFormatted });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the cart." });
  }
};

// Controller for deleting a cart
const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the cart." });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
};
