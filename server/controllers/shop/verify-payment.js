const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

const verifyPayment = async (req, res) => {
  const { orderId, sessionId } = req.body;

  const order = await Order.findById(orderId);
 // console.log(order);
  if (!order) return res.status(404).json({ success: false });

  // 🛑 Idempotency protection
  if (order.paymentStatus === "paid") {
    return res.json({ success: true });
  }

  // 🔥 Retrieve session
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent"],
  });

  if (session.payment_intent.status !== "succeeded") {
    return res.status(400).json({ success: false });
  }

  // ✅ UPDATE ORDER
  order.paymentStatus = "paid";
  order.orderStatus = "confirmed";

  // ✅ UPDATE STOCK
  for (const item of order.cartItems) {
    const product = await Product.findById(item.productId);
    if (product) {
      product.totalStock -= item.quantity;
      await product.save();
    }
  }

  // ✅ CLEAR CART
  await Cart.findByIdAndDelete(order.cartId);

  await order.save();

  return res.json({ success: true });
};

module.exports = verifyPayment;
