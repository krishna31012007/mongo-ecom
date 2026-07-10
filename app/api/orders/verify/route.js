import connectDB from "@/lib/db";
import Order from "@/models/Order";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, razorpayKeySecret } = await req.json();

    const keySecret = razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return Response.json({ error: "Missing Razorpay secret" }, { status: 400 });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
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
