import express from "express";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
  getStatus,
  getOrder
} from "../controller/orderController.js";
import { authMiddlewear } from "../middlewear/auth.js";
const router = express.Router();

router.post("/placeorder", authMiddlewear, placeOrder);
router.post("/verify", verifyOrder);
router.get("/orders/:userId", authMiddlewear, userOrders);
router.get("/listorder", listOrders);
router.get("/getstatus/:id",getStatus);
router.post("/status", updateStatus);
router.get("/:id",authMiddlewear,getOrder);

export default router;
