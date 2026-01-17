const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    color: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    size: String,
    shape:String,
    material:String,
  },
  { timestamps: true }
);

ProductSchema.index({
  title: "text",
  description: "text",
});


module.exports = mongoose.model("Product", ProductSchema);
