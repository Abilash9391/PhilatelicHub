import express from "express";
import { authMiddlewear } from "../middlewear/auth.js";
import { getCart, addCart, deleteCart } from "../controller/cartController.js";
const router = express.Router();

router.get("/getcart", authMiddlewear, getCart);
router.post("/addcart", authMiddlewear, addCart);
router.post("/deletecart", authMiddlewear, deleteCart);

export default router;
