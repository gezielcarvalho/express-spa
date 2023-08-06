const Product = require("../models/Product");

// Controller for creating a new product
const createProduct = async (req, res) => {
  try {
    const { Name, Description, Price, Shipping, Image } = req.body;
    const newProduct = await Product.create({
      Name,
      Description,
      Price,
      Shipping,
      Image,
    });
    // destructure the new product object to omit the __v and _id fields
    const { __v, _id, ...product } = newProduct.toObject();
    res.status(201).json({ Id: _id, ...product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // destructure the new product object to omit the __v and _id fields and include the Id field with the _id value
    const productsFormatted = products.map((product) => {
      const { __v, _id, ...productFormatted } = product.toObject();
      return { Id: _id, ...productFormatted };
    });
    res.status(200).json(productsFormatted);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting a specific product by Id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    // destructure the new product object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...productFormatted } = product.toObject();
    res.status(200).json({ Id: _id, ...productFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for updating a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { Name, Description, Price, Shipping, Image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { Name, Description, Price, Shipping, Image },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    // destructure the new product object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...productFormatted } = updatedProduct.toObject();
    res.status(200).json({ Id: _id, ...productFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for deleting a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    // destructure the new product object to omit the __v and _id fields and include the Id field with the _id value

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
