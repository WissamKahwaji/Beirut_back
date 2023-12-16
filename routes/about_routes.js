import express from "express";
import {
  addAboutData,
  editAboutData,
  getAboutData,
} from "../controllers/about_ctrl.js";

const router = express.Router();

router.get("/", getAboutData);
router.post("/", addAboutData);
router.put("/", editAboutData);

export default router;
