import mongoose from "mongoose";

const aboutContentSchema = new mongoose.Schema({
  img: String,
  title: String,
  text: String,
});

const aboutSchema = new mongoose.Schema({
  img: String,
  title: String,
  description: String,
  content: [aboutContentSchema.obj],
});

export const aboutModel = mongoose.model("about", aboutSchema);
