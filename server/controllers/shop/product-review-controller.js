const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, reviewMessage, reviewValue } = req.body;

    const userId = req.user.id;        // ✅ from JWT
    const userName = req.user.userName;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: { $in: ["confirmed", "delivered"] },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this product to review it.",
      });
    }

    const existingReview = await ProductReview.findOne({ productId, userId });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = await ProductReview.create({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    const reviews = await ProductReview.find({ productId });
    const averageReview =
      reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({ success: true, data: newReview });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
   // console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
