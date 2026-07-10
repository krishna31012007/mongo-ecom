import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    society: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    items: [
      {
        title: String,
        price: Number,
        image: String,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    orderStatus: {
      type: String,
      default: "placed",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
