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
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getProductData);
router.get("/byid/:id", getProductDataById);
router.post("/", auth, addProduct);
router.put("/:id", auth, editProduct);
router.delete("/:id", auth, deleteProductData);
router.get("/by-type", getProductsByType);
router.get("/product-type", getProductTypeData);
router.post("/product-type", auth, addProductTypeData);
router.put("/product-type/:id", auth, editProductTypeData);
router.delete("/delete-product-type/:id", auth, deleteProductTypeData);
router.get("/type-products", getProductsAndTypes);
router.get("/get-type/:id", getProductTypeByIdData);
export default router;
