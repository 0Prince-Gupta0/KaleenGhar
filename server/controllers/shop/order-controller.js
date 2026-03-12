const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

/* ================= CREATE ORDER (NO PAYMENT) ================= */
const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const {
      cartId,
      cartItems,
      addressInfo,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const order = new Order({
      userId,
      cartId,
      orderId,
      cartItems,
      addressInfo,
      paymentMethod: "stripe",
      paymentStatus: "pending",
      orderStatus: "pending",
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId: order._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

/* ================= USER ORDERS ================= */
const getAllOrdersByUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

/* ================= ORDER DETAILS ================= */
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (userId && order.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
};
