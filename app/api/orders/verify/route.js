import connectDB from "@/lib/db";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await req.json();

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    await connectDB();
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: isValid ? "paid" : "failed",
      razorpayPaymentId: razorpay_payment_id,
    });

    return Response.json({ success: isValid });
  } catch (error) {
    console.error("Verification failed", error);
    return Response.json({ error: "Verification failed" }, { status: 500 });
  }
}
