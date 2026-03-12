const express = require("express");
const { authMiddleware, adminMiddleware } = require("../../controllers/auth/auth-controller");
const { getHero, updateHero } = require("../../controllers/common/hero-controller");

const router = express.Router();

router.get("/", getHero);
router.put("/", authMiddleware, adminMiddleware, updateHero);

module.exports = router;
