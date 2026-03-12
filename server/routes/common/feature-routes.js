const express = require("express");
const { authMiddleware, adminMiddleware } = require("../../controllers/auth/auth-controller");
const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.get("/get", getFeatureImages);
router.post("/add", authMiddleware, adminMiddleware, addFeatureImage);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteFeatureImage);

module.exports = router;
