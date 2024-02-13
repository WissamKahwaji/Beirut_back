import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    userName: String,
    country: String,
    city: String,
    userStreet: String,
    userBuilding: String,
    userMobileNumber: String,
    userNote: String,
    orderStatus: String,
    cartItemsTotalPrice: Number,
    paymentMethod: String,
    deliveryFee: Number,
    cartItems: [
      {
        id: String,
        img: String,
        title: String,
        price: Number,
        quantity: Number,
        weight: String,
      },
    ],
  },
  { timestamps: true }
);
export const orderModel = mongoose.model("Order", orderSchema);
