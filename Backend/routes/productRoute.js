import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
} from "../controller/productController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.get("/list", listProduct);
router.post("/add", upload.single("imageFile"), addProduct);
router.post("/remove", removeProduct);

export default router;
