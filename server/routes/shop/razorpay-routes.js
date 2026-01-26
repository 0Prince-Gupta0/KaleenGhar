const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  cancelPayment,
} = require("../../controllers/shop/razorpay-controller");
const { razorpayWebhook } = require("../../controllers/shop/razorpay-webhook");

// console.log("createOrder type:", typeof createOrder);
// console.log("verifyPayment type:", typeof verifyPayment);


router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.post("/cancel", cancelPayment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  razorpayWebhook
);


module.exports = router;
