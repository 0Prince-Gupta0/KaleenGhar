const crypto = require("crypto");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");

exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ success: false });
    }

    const event = JSON.parse(req.body.toString());

    // ✅ PAYMENT SUCCESS
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const razorpayOrderId = payment.order_id;

      const order = await Order.findOneAndUpdate(
        { orderId: razorpayOrderId },
        {
          paymentId: payment.id,
          paymentStatus: "paid",
          orderStatus: "confirmed",
          orderUpdateDate: new Date(),
        },
        { new: true }
      );

      if (order) {
        await Cart.findOneAndDelete({
          userId: order.userId,
        });
      }
    }

    // ❌ PAYMENT FAILED
    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;

      await Order.findOneAndDelete({
        orderId: payment.order_id,
        paymentStatus: "pending",
      });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ success: false });
  }
};
