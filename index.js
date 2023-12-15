import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import navBarRoutes from "./routes/navBar_routes.js";
import colorsRoutes from "./routes/colors_routes.js";
import contactRoutes from "./routes/contact_router.js";
import aboutRoutes from "./routes/about_routes.js";
import logoRoutes from "./routes/logo_routes.js";
import productRoutes from "./routes/product_routes.js";
import homeRoutes from "./routes/home_routes.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "img", maxCount: 1 },
    { name: "imgs", maxCount: 5 },
    { name: "landingImg", maxCount: 1 },
    { name: "logoImg", maxCount: 1 },
    { name: "mainLogoImg", maxCount: 1 },
    { name: "imgHeading", maxCount: 1 },
    { name: "imgs[first]", maxCount: 1 },
    { name: "imgs[second]", maxCount: 1 },
    { name: "imgs[third]", maxCount: 1 },
    { name: "content[0]['img']", maxCount: 1 },
    { name: "content[1]['img']", maxCount: 1 },
    { name: "content[2]['img']", maxCount: 1 },
    { name: "content[3]['img']", maxCount: 1 },
  ])
);

app.use("/navBar", navBarRoutes);
app.use("/colors", colorsRoutes);
app.use("/contact", contactRoutes);
app.use("/about", aboutRoutes);
app.use("/logo", logoRoutes);
app.use("/products", productRoutes);
app.use("/home", homeRoutes);

app.get("/", (req, res) => res.send("Server is Ready"));

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    })
  )
  .catch(error => console.log(error.message));

mongoose.set("strictQuery", true);
