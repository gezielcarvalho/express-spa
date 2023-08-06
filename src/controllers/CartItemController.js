const CartItem = require("../models/CartItem");

// Controller for creating a new cart item
const createCartItem = async (req, res) => {
  try {
    const {
      CartId,
      ProductId,
      ProductQuantity,
      ProductPrice,
      ProductShipping,
    } = req.body;
    const newCartItem = await CartItem.create({
      CartId,
      ProductId,
      ProductQuantity,
      ProductPrice,
      ProductShipping,
    });
    // destructure the new cart item object to omit the __v and _id fields
    const { __v, _id, ...cartItem } = newCartItem.toObject();
    res.status(201).json({ Id: _id, ...cartItem });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting all cart items
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    // destructure the new cart item object to omit the __v and _id fields and include the Id field with the _id value
    const cartItemsFormatted = cartItems.map((cartItem) => {
      const { __v, _id, ...cartItemFormatted } = cartItem.toObject();
      return { Id: _id, ...cartItemFormatted };
    });
    res.status(200).json(cartItemsFormatted);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting a specific cart item by Id
const getCartItemById = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }
    // destructure the new cart item object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...cartItemFormatted } = cartItem.toObject();
    res.status(200).json({ Id: _id, ...cartItemFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for updating a cart item
const updateCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const {
      CartId,
      ProductId,
      ProductQuantity,
      ProductPrice,
      ProductShipping,
    } = req.body;
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      cartItemId,
      {
        CartId,
        ProductId,
        ProductQuantity,
        ProductPrice,
        ProductShipping,
      },
      { new: true }
    );
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }
    const { __v, _id, ...cartItemFormatted } = updatedCartItem.toObject();
    res.status(200).json({ Id: _id, ...cartItemFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for deleting a cart item
const deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const deletedCartItem = await CartItem.findByIdAndDelete(cartItemId);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found." });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
