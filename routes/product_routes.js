import express from "express";
import {
  addProduct,
  addProductTypeData,
  editProduct,
  editProductTypeData,
  getProductData,
  getProductDataById,
  getProductTypeData,
  getProductsAndTypes,
  getProductsByType,
} from "../controllers/product_ctrl.js";

const router = express.Router();

router.get("/", getProductData);
router.get("/byid/:id", getProductDataById);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.get("/by-type", getProductsByType);
router.get("/product-type", getProductTypeData);
router.post("/product-type", addProductTypeData);
router.put("/product-type/:id", editProductTypeData);
router.get("/type-products", getProductsAndTypes);
export default router;
