import express from "express";
import {
  addAboutData,
  editAboutData,
  getAboutData,
} from "../controllers/about_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAboutData);
router.post("/", auth, addAboutData);
router.put("/:id", auth, editAboutData);

export default router;
