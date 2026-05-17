const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const {
  createOrder,
  verifyPayment,
  cancelPayment,
} = require("../../controllers/shop/razorpay-controller");
router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);
router.post("/cancel", authMiddleware, cancelPayment);

module.exports = router;
