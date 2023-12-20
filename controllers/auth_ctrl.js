import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authModel } from "../models/auth/auth_model.js";

export const signin = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(404).json({
        success: false,
        message: "Invalid password",
      });
    }

    const existingUser = await authModel.findOne();
    if (!existingUser)
      return res.status(401).json({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    // existingUser = existingUser.select('-password');
    res.status(200).json({
      message: "LogIn Successfuled",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addAuth = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await authModel({
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return res.status(201).json({
      message: "Success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
