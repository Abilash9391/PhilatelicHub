import userModel from "../models/user.js";
import bcryptjs from "bcryptjs"
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const signupUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || fullname.trim() === "") {
      return res.json({
        success: false,
        message: "Input your Full Name",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        message: "Input your Email Address",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "Input your Password",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "This is Not A Valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password is too Short",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Password is not strong enough add Capital Letters ,Numbers and Special Characters",
      });
    }
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "Email Exist" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new userModel({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, tokens: token });
  } catch (error) {
    res.json({ success: false, message: "Cannot Create User" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({
        success: false,
        message: "Input your Email Address",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "This is Not A Valid Email",
      });
    }
    if (!password) {
      return res.json({
        success: false,
        message: "Input your Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Sorry, we don't recognize this email.",
      });
    }
    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Invalid Password" });
    }
    const token = createToken(user._id);
    res.json({ success: true, tokens: token ,userId: user._id,name: user.fullname});
  } catch (error) {
    res.json({ success: false, message: "Can not Login" });
  }
};
