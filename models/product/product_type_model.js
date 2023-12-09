import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
  name: String,
  img: String,
});

export const productTypeModel = mongoose.model(
  "ProductType",
  productTypeSchema
);
