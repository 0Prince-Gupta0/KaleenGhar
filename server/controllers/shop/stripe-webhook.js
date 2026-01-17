const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

const stripeWebhook = async (req, res) => {
  //console.log("🔥 Stripe webhook hit");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
   // console.log("✅ Webhook verified:", event.type);
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    return res.status(400).send(`Webhook Error`);
  }

  if (event.type === "payment_intent.succeeded") {
  //  console.log("💰 PAYMENT CONFIRMED");

    const session = event.data.object;
    const orderId = session.metadata.orderId;

    const order = await Order.findById(orderId);
    if (!order) return res.json({ received: true });

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";

    for (const item of order.cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.totalStock -= item.quantity;
        await product.save();
      }
    }

    await Cart.findByIdAndDelete(order.cartId);
    await order.save();

    //console.log("✅ Order updated:", orderId);
  }

  res.json({ received: true });
};


module.exports = stripeWebhook;
