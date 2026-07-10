import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Razorpay from "razorpay";

const getRazorpayClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { userName, society, phone, address, items, totalAmount } = body;

    if (!userName || !society || !phone || !address || !items?.length || !totalAmount) {
      return Response.json({ error: "Missing order details" }, { status: 400 });
    }

    await connectDB();

    const razorpayClient = getRazorpayClient();
    if (!razorpayClient) {
      return Response.json({ error: "Razorpay is not configured yet" }, { status: 503 });
    }

    const options = {
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `order_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpayClient.orders.create(options);

    const order = await Order.create({
      userName,
      society,
      phone,
      address,
      items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
    });

    return Response.json({
      success: true,
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.error("Order creation failed", error);
    return Response.json({ error: "Order creation failed" }, { status: 500 });
  }
}
