import express from "express";
import {
  addOrder,
  deleteOrderById,
  getLastUserOrder,
  getOrderById,
  getOrders,
  getUserOrders,
} from "../controllers/order_ctrl.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/submit", addOrder);
router.get("/user-orders/:userId", getUserOrders);
router.get("/last-user-order/:userId", getLastUserOrder);
router.delete("/delete-order/:id", deleteOrderById);

export default router;
