const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

/* ================= HELPER ================= */
const buildCartResponse = async (cart) => {
  await cart.populate({
    path: "items.productId",
    select: "title gallery sizes",
  });

  const items = cart.items
    .filter((item) => item.productId)
    .map((item) => {
      const product = item.productId;

      const sizeData = product.sizes?.find(
        (s) => s.label === item.size
      );

      const price =
        sizeData?.salePrice > 0
          ? sizeData.salePrice
          : sizeData?.price || 0;

      return {
        productId: product._id,
        title: product.title,
        image: product.gallery?.[0] || "",
        size: item.size,
        price,
        stock: sizeData?.stock || 0,   // ⭐ IMPORTANT
        quantity: item.quantity,
      };
    });

  return {
    _id: cart._id,
    userId: cart.userId,
    items,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};

/* ================= ADD ================= */
const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, size, quantity } = req.body;

    if (!userId || !productId || !size || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const index = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size
    );

    if (index === -1) {
      cart.items.push({ productId, size, quantity });
    } else {
      cart.items[index].quantity += quantity;
    }

    await cart.save();

    const formatted = await buildCartResponse(cart);

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

/* ================= FETCH ================= */
const fetchCartItems = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(200).json({
        success: true,
        data: { items: [] }, // ⭐ avoid 404 → better UX
      });

    const formatted = await buildCartResponse(cart);

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

/* ================= UPDATE ================= */
const updateCartItemQty = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { productId, size, quantity } = req.body;

    if (!userId || !productId || !size || quantity <= 0)
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });

    const index = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size
    );

    if (index === -1)
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });

    cart.items[index].quantity = quantity;
    await cart.save();

    const formatted = await buildCartResponse(cart);

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

/* ================= DELETE ================= */
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const { productId, size } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart)
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.size === size
        )
    );

    await cart.save();

    const formatted = await buildCartResponse(cart);

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
};