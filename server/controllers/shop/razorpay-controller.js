const razorpay = require("../../helpers/razorpay");
const Order = require("../../models/Order");
const crypto = require("crypto");

/* ------------------------------------
   CREATE ORDER (Called from frontend)
------------------------------------- */
exports.createOrder = async (req, res) => {
  try {
    const { cartItems, amount, address } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    const order = await Order.create({
      userId: address.userId,
      orderId: razorpayOrder.id,
      cartItems,
      totalAmount: amount,
      addressInfo: {
        addressId: address._id,
        address: address.address,
        city: address.city,
        pincode: address.pincode,
        phone: address.phone,
        notes: address.notes,
      },
      orderStatus: "pending",
      paymentStatus: "pending",
      paymentMethod: "razorpay",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    });

    return res.json({
      success: true,
      razorpayOrder,
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

/* ------------------------------------
   VERIFY PAYMENT (Frontend only)
   ❌ No DB update here
------------------------------------- */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    // ✅ Just acknowledge – webhook will do DB update
    return res.json({
      success: true,
      message: "Payment verified",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
};

/* ------------------------------------
   CANCEL PAYMENT (Popup closed)
------------------------------------- */
exports.cancelPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    await Order.findOneAndDelete({
      orderId,
      paymentStatus: "pending",
    });

    return res.json({
      success: true,
      message: "Order cancelled",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cancel failed",
    });
  }
};
