import express from "express";
import {
  addNavData,
  editNavBarData,
  getNavData,
} from "../controllers/navbar_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getNavData);
router.post("/add", auth, addNavData);
router.put("/edit/:id", auth, editNavBarData);

export default router;
