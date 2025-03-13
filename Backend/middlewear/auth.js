import jwt from "jsonwebtoken";

export const authMiddlewear = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const token_decode = jwt.verify(token, process.env.SECRET);
    req.body.id = token_decode._id;
    next();
  } catch (error) {
    res.json({ success: false, message: "Error2" });
  }
};
