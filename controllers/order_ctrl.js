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

export const getLastUserOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const lastOrder = await orderModel
      .findOne({ userId: userId })
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .limit(1); // Limit the result to 1 order

    if (!lastOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(lastOrder);
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
      country,
      city,
      userStreet,
      userBuilding,
      userFloorNo,
      userUnitNo,
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
      country,
      city,
      userStreet,
      userBuilding,
      userFloorNo,
      userUnitNo,
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
      data: newOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Something went wrong");
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
