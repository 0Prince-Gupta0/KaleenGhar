const express = require("express");
const {
  createCheckoutSession,
} = require("../../controllers/shop/stripe-controller");
const stripeWebhook = require("../../controllers/shop/stripe-webhook");

const router = express.Router();

/* ================= STRIPE ================= */
router.post("/webhook", stripeWebhook);
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
