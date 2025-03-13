import newsModel from "../models/news.js";
import validator from "validator";

export const newsubscribe = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.json({
        success: false,
        message: "Input Email Address",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: " Not A Valid Email",
      });
    }
    const exist = await newsModel.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "Already Subscribed ",
      });
    }
    const newNews = new newsModel({
      email: email,
    });
    const news = await newNews.save();
    res.json({
      success: true,
      data: news,
      message: "Subscribed",
    });
  } catch (error) {
    res.json({ success: false, message: "Cannot Subscribe" });
  }
};
