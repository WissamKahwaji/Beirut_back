import express from "express";
import {
  addProduct,
  addProductTypeData,
  editProduct,
  editProductTypeData,
  getProductData,
  getProductTypeData,
  getProductsByType,
} from "../controllers/product_ctrl.js";

const router = express.Router();

router.get("/", getProductData);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.get("/by-type", getProductsByType);
router.get("/product-type", getProductTypeData);
router.post("/product-type", addProductTypeData);
router.put("/product-type/:id", editProductTypeData);
export default router;
