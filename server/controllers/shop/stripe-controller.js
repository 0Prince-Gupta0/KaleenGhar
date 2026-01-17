const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../../models/Order");

const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, orderId } = req.body;

   const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",

  line_items: cartItems.map((item) => ({
    price_data: {
      currency: "inr", // 🇮🇳 INR ONLY
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  })),

  // 🔥 ADD THESE TWO
  billing_address_collection: "auto",

  shipping_address_collection: {
    allowed_countries: ["IN"], // 🇮🇳 INDIA ONLY
  },

 success_url: `${process.env.FRONTEND_URL}/shop/payment-success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.FRONTEND_URL}/shop/payment-failed`,

  metadata: {
    orderId,
  },
});


    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Stripe session failed",
    });
  }
};

module.exports = { createCheckoutSession };
