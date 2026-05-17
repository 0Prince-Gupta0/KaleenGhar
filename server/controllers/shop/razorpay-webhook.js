const crypto = require("crypto");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("RAZORPAY_WEBHOOK_SECRET is not set");
      return res.status(500).json({ success: false });
    }

    const signature = req.headers["x-razorpay-signature"];

    console.log("🔥 WEBHOOK HIT");
    console.log("HEADERS:", req.headers);
    console.log("BODY exists?:", !!req.body);
    console.log("RAW BODY exists?:", !!req.rawBody);

    if (!req.rawBody) {
      console.error("❌ req.rawBody is missing! Make sure express.json({ verify: ... }) is running.");
      return res.status(400).json({ success: false, message: "Missing raw body" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Signature mismatch!");
      console.error("EXPECTED:", expectedSignature);
      console.error("RECEIVED:", signature);
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const event = JSON.parse(req.rawBody.toString());
    console.log("✅ Webhook verified! Event:", event.event);

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
        for (const item of order.cartItems || []) {
          const product = await Product.findById(item.productId);
          if (product && product.sizes?.length) {
            const sizeObj = item.size
              ? product.sizes.find((s) => s.label === item.size)
              : product.sizes[0];
            if (sizeObj && sizeObj.stock !== undefined) {
              sizeObj.stock = Math.max(0, (sizeObj.stock || 0) - item.quantity);
              await product.save();
            }
          }
        }
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
