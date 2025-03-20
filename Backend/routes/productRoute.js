import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  addUserProduct,
  updateVerify,
  VerifyProductslist,
  VerifyProductslistUser
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
router.get("/userverifyprod/:id",VerifyProductslistUser);
router.get("/verifyproducts",VerifyProductslist);
router.post("/verifyprod/:id",updateVerify);
router.post("/adduserprod",upload.single("imageFile"),addUserProduct);
router.post("/add", upload.single("imageFile"), addProduct);
router.post("/remove", removeProduct);

export default router;
