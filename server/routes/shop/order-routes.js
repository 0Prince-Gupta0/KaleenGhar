const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");
const verifyPayment = require("../../controllers/shop/verify-payment");

const router = express.Router();

/* ================= ORDERS ================= */
router.post("/create", createOrder);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);
router.post("/verify-payment",verifyPayment);
module.exports = router;
