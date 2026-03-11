const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const {
  createCheckoutSession,
} = require("../../controllers/shop/stripe-controller");
const stripeWebhook = require("../../controllers/shop/stripe-webhook");

const router = express.Router();

/* ================= STRIPE ================= */
router.post("/webhook", stripeWebhook);
router.post("/create-checkout-session", authMiddleware, createCheckoutSession);

module.exports = router;
