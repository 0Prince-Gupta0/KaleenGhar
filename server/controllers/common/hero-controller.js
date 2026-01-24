// controllers/heroController.js
const Hero = require("./../../models/hero");

exports.getHero = async (req, res) => {
  const hero = await Hero.findOne();
  res.json(hero);
};

exports.updateHero = async (req, res) => {
  const hero = await Hero.findOneAndUpdate(
    {},
    req.body,
    { new: true, upsert: true }
  );
  res.json(hero);
};
