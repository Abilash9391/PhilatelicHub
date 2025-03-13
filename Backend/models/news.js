import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    email: { type: String, reqired: true },
  },
  {
    minimize: false,
  }
);

const newsModel = mongoose.models.news || mongoose.model("news", newsSchema);
export default newsModel;
