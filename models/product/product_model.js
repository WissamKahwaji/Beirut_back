import mongoose from "mongoose";

const deepDetailsSchema = new mongoose.Schema({
  price: String,
  weight: String,
});

const productSchema = new mongoose.Schema({
  img: String,
  imgs: {
    first: String,
    second: String,
    third: String,
  },
  title: String,
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
  },
  desc: String,
  deepDetails: [deepDetailsSchema],
});

export const Product = mongoose.model("Product", productSchema);
export default productSchema;
