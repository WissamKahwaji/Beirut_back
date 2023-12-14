import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
  name: String,
  img: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export const productTypeModel = mongoose.model(
  "ProductType",
  productTypeSchema
);
