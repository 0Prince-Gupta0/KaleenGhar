const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const {
  createOrder,
  verifyPayment,
  cancelPayment,
} = require("../../controllers/shop/razorpay-controller");
const { razorpayWebhook } = require("../../controllers/shop/razorpay-webhook");

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);
router.post("/cancel", authMiddleware, cancelPayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);


module.exports = router;
