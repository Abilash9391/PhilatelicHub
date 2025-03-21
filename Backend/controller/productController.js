import productModel from "../models/product.js";
import cloudinary from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";

export const addUserProduct = async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    features,
    inStock,
    color,
    verified,
    userId,
    quantity, // Added
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
      !verified ||
      !userId ||
      !quantity // Added
    ) {
      return res.json({ success: false, message: "All fields must be filled" });
    }

    const exist = await productModel.findOne({ name, userId }); // Check name and userId
    if (exist) {
      // Update existing product's quantity
      exist.quantity = (exist.quantity || 0) + parseInt(quantity, 10);
      if (exist.quantity > 0) {
        exist.inStock = true; // Update inStock if quantity becomes positive
      }
      await exist.save();
      return res.json({ success: true, message: "Product quantity updated" });
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
      verified,
      userId,
      quantity, // Added
      imageFile: "", // Placeholder, updated after upload
    });

    const image = req.file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    newProduct.imageFile = uploadResponse.url;

    await newProduct.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: "Cannot Add Product" });
  }
};

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
    quantity, // Added
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
      !newCollection ||
      !quantity // Added
    ) {
      return res.json({ success: false, message: "All fields must be filled" });
    }

    const exist = await productModel.findOne({ name });
    if (exist) {
      // Update existing product's quantity
      exist.quantity = (exist.quantity || 0) + parseInt(quantity, 10);
      if (exist.quantity > 0) {
        exist.inStock = true; // Ensure inStock is true if quantity becomes positive
      }
      await exist.save();
      return res.json({ success: true, message: "Product quantity updated" });
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
      quantity, // Added
      imageFile: "", // Placeholder, updated after upload
    });

    const image = req.file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    newProduct.imageFile = uploadResponse.url;

    await newProduct.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: "Cannot Add Product" });
  }
};

// export const addUserProduct = async (req, res) => {
//   console.log("Received file:", req.file);
// console.log("Received body:", req.body);
//   const {
//     name,
//     brand,
//     category,
//     description,
//     price,
//     features,
//     inStock,
//     color,
//     verified,
//     userId
//   } = req.body;
//   try {
//     if (!req.file) {
//       return res.json({ success: false, message: "No File to Upload" });
//     }

//     if (
//       !name ||
//       !brand ||
//       !category ||
//       !description ||
//       !price ||
//       !features ||
//       !inStock ||
//       !color ||
//       !verified||
//       !userId
//     ) {
//       return res.json({ success: false, message: "All fields must be filled" });
//     }

//     const exist = await productModel.findOne({ name });

//     if (exist) {
//       return res.json({
//         success: false,
//         message: "Product is already in database",
//       });
//     }

//     const newProduct = new productModel({
//       name,
//       description,
//       price,
//       category,
//       brand,
//       color,
//       features,
//       inStock,
//       verified,
//       userId
//     });

//     const savedProduct = await newProduct.save();

//     const image = req.file;
//     const base64Image = Buffer.from(image.buffer).toString("base64");
//     const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//     const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
//     const imageFile = uploadResponse.url;

//     savedProduct.imageFile = imageFile;
//     await savedProduct.save();

//     res.json({ success: true, message: "Product Added" });
//   } catch (error) {
//     res.json({ success: false, message: "Cannot Add Product" });
//   }
// };

// export const addProduct = async (req, res) => {
//   const {
//     name,
//     brand,
//     category,
//     description,
//     price,
//     features,
//     inStock,
//     color,
//     newCollection,
//   } = req.body;
//   try {
//     if (!req.file) {
//       return res.json({ success: false, message: "No File to Upload" });
//     }

//     if (
//       !name ||
//       !brand ||
//       !category ||
//       !description ||
//       !price ||
//       !features ||
//       !inStock ||
//       !color ||
//       !newCollection
//     ) {
//       return res.json({ success: false, message: "All fields must be filled" });
//     }

//     const exist = await productModel.findOne({ name });

//     if (exist) {
//       return res.json({
//         success: false,
//         message: "Product is already in database",
//       });
//     }

//     const newProduct = new productModel({
//       name,
//       description,
//       price,
//       category,
//       brand,
//       color,
//       features,
//       inStock,
//       newCollection,
//     });

//     const savedProduct = await newProduct.save();

//     const image = req.file;
//     const base64Image = Buffer.from(image.buffer).toString("base64");
//     const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//     const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
//     const imageFile = uploadResponse.url;

//     savedProduct.imageFile = imageFile;
//     await savedProduct.save();

//     res.json({ success: true, message: "Product Added" });
//   } catch (error) {
//     res.json({ success: false, message: "Cannot Add Product" });
//   }
// };

export const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({
      $or: [
        { verified: { $exists: false } },
        { verified: "Verified" }
      ]
    });
    
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

export const VerifyProductslist= async (req,res)=>{
  try{
    const products = await productModel.find({ verified: { $exists: true}});
    res.status(200).json({ success: true, data: products });
    } 
    catch (error) {
      res.status(500).json({success: false,
        message: "Failed to fetch products",
        error: error.message,
        });
      }
}

export const VerifyProductslistUser= async (req,res)=>{
  try{
    const {id}=req.params;
    // const response = await VerifyProductslist();
    // const products = response.data;
    const products = await productModel.find({ verified: { $exists: true}, userId:id});
    if(products.length==0)
      {res.status(404).json({ success: true, message: "No products found"})}
    // const userProducts= products.filter({userId : id});
    res.status(200).json({ success: true, data: products});
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err.message,
      });
    }
  }

export const updateVerify= async (req,res) => {
  try {
    await productModel.findByIdAndUpdate(req.body.orderId, { verified: req.body.verified });
    res.json({ success: true, message: "Status Updated" });
} catch (error) {
    res.status(500).json({ success: false, message: "Cannot Update Status: " + error.message });
}
}



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
