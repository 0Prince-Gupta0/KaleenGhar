const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

/* ================= CREATE ORDER (NO PAYMENT) ================= */
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
    } = req.body;

    const order = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      paymentMethod: "stripe",
      paymentStatus: "pending",
      orderStatus: "pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
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
    const { userId } = req.params;

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

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
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
