import productModel from "../models/product.js";
import cloudinary from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";

export const addProduct = async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    features,
    inStock,
    color,
    newCollection,
  } = req.body;
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No File to Upload" });
    }

    if (
      !name ||
      !brand ||
      !category ||
      !description ||
      !price ||
      !features ||
      !inStock ||
      !color ||
      !newCollection
    ) {
      return res.json({ success: false, message: "All fields must be filled" });
    }

    const exist = await productModel.findOne({ name });

    if (exist) {
      return res.json({
        success: false,
        message: "Product is already in database",
      });
    }

    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      brand,
      color,
      features,
      inStock,
      newCollection,
    });

    const savedProduct = await newProduct.save();

    const image = req.file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    const imageFile = uploadResponse.url;

    savedProduct.imageFile = imageFile;
    await savedProduct.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: "Cannot Add Product" });
  }
};

export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const products = await productModel.findById(req.body.id);

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Product not Found" });
    }

    await productModel.findByIdAndDelete(req.body.id);
    const imageUrl = products.imageFile;
    const publicId = extractPublicId(imageUrl);
    await cloudinary.uploader.destroy(publicId);

    res.json({ success: true, message: "Product has been deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to to delete product",
      error: error.message,
    });
  }
};
