const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");
const verifyPayment = require("../../controllers/shop/verify-payment");

const router = express.Router();

/* ================= ORDERS ================= */
router.post("/create", authMiddleware, createOrder);
router.get("/list/:userId", authMiddleware, getAllOrdersByUser);
router.get("/details/:id", authMiddleware, getOrderDetails);
router.post("/verify-payment", authMiddleware, verifyPayment);
module.exports = router;
