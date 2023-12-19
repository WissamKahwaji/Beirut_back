import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  password: String,
});

export const authModel = mongoose.model("Auth", authSchema);
