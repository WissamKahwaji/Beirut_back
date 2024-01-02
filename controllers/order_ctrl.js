import { orderModel } from "../models/order/order_model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findById(id);

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await orderModel.find({ userId: userId });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const addOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      city,
      userStreet,
      userBuilding,
      userMobileNumber,
      userNote,
      orderStatus,
      cartItemsTotalPrice,
      paymentMethod,
      deliveryFee,
      cartItems,
    } = req.body;

    const newOrder = new orderModel({
      userId: userId,
      userName,
      city,
      userStreet,
      userBuilding,

      userMobileNumber,
      userNote,
      orderStatus,
      cartItemsTotalPrice,
      deliveryFee,
      paymentMethod,
      cartItems,
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Order added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};
