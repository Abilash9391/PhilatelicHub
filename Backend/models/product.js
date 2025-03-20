import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageFile: { type: String, required: false },
  inStock: { type: Boolean, required: true },
  newCollection: { type: Boolean },
  features: { type: String, required: true },
  color: { type: String, required: true },
  verified:{type: String},
  userId:{type: String},
  quantity:{type:Number}
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
