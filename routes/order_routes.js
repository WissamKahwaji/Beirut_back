import express from "express";
import {
  addOrder,
  getOrderById,
  getOrders,
  getUserOrders,
} from "../controllers/order_ctrl.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/submit", addOrder);
router.get("/user-orders/:userId", getUserOrders);

export default router;
