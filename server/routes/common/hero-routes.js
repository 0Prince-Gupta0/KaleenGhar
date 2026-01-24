const express = require("express");
const { getHero, updateHero } = require("../../controllers/common/hero-controller");



const router = express.Router();

router.get("/", getHero);
router.put("/", updateHero); // Admin only

module.exports = router;
