import { Request, Response } from "express";
import Product from "../models/Product";

// Controller for creating a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  let uploadPath;
  let imageName = "default.jpg";
  if (
    !req.files ||
    Object.keys(req.files).length === 0 ||
    !(req.files.Image as any)?.name.match(/\.(jpg|jpeg|png)$/i)
  ) {
    console.log("No image files were uploaded.");
  } else {
    const Image = req.files.Image as any;
    imageName = `${Date.now()}-${Image.name}`;
    console.log(imageName);
    uploadPath = "./public/images/products/" + imageName;
    Image.mv(uploadPath, async (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }
  try {
    const { Name, Description, Price, Shipping } = req.body;
    const newProduct = await Product.create({
      Name,
      Description,
      Price,
      Shipping,
      Image: imageName,
    });
    // destructure the new product object to omit the __v and _id fields
    const { __v, _id, ...product } = newProduct.toObject();
    res.status(201).json({ Id: _id, ...product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for getting all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
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
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found." });
      return;
    }
    // destructure the new product object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...productFormatted } = product.toObject();
    res.status(200).json({ Id: _id, ...productFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for updating a product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;
    const { Name, Description, Price, Shipping, Image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { Name, Description, Price, Shipping, Image },
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found." });
      return;
    }
    // destructure the new product object to omit the __v and _id fields and include the Id field with the _id value
    const { __v, _id, ...productFormatted } = updatedProduct.toObject();
    res.status(200).json({ Id: _id, ...productFormatted });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Controller for deleting a product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found." });
      return;
    }
    // destructure the new product object to omit the __v and _id fields and include the Id field with the _id value

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error });
  }
};
