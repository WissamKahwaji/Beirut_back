import express from "express";
import { addHomeData, getHomeData } from "../controllers/home_ctrl.js";

const router = express.Router();

router.get("/", getHomeData);
router.post("/", addHomeData);

export default router;
