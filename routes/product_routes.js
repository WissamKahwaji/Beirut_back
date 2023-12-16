import express from "express";
import {
  addProduct,
  addProductTypeData,
  deleteProductData,
  deleteProductTypeData,
  editProduct,
  editProductTypeData,
  getProductData,
  getProductDataById,
  getProductTypeByIdData,
  getProductTypeData,
  getProductsAndTypes,
  getProductsByType,
} from "../controllers/product_ctrl.js";

const router = express.Router();

router.get("/", getProductData);
router.get("/byid/:id", getProductDataById);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProductData);
router.get("/by-type", getProductsByType);
router.get("/product-type", getProductTypeData);
router.post("/product-type", addProductTypeData);
router.put("/product-type/:id", editProductTypeData);
router.delete("/delete-product-type/:id", deleteProductTypeData);
router.get("/type-products", getProductsAndTypes);
router.get("/get-type/:id", getProductTypeByIdData);
export default router;
