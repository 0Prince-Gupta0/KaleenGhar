const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const requiredEnvVars = [
  "DB_URL",
  "CLIENT_SECRET_KEY",
  "FRONTEND_URL",
];
const missing = requiredEnvVars.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing required env vars:", missing.join(", "));
  process.exit(1);
}

/* ================= ROUTES ================= */
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const heroRoutes=require("./routes/common/hero-routes");
const stripeRoutes = require("./routes/shop/stripeRoutes");
const razorpayRoutes=require("./routes/shop/razorpay-routes");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many attempts" },
});

const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

/* ================= CORS ================= */
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/shop/razorpay-routes")
);

/* ================= STRIPE WEBHOOK (RAW BODY) ================= */
app.use(
  "/api/shop/stripe/webhook",
  express.raw({ type: "application/json" })
);

/* ================= MIDDLEWARE ================= */
app.use(cookieParser());
app.use(express.json());
app.use("/api", generalLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

/* ================= ROUTES ================= */
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/common/hero", heroRoutes );
app.use("/api/shop/stripe", stripeRoutes);
app.use("/api/payment", razorpayRoutes);

/* ================= START ================= */
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
