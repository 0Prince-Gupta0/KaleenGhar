const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    gallery: [String], 
    title: String,
    description: String,
    category: String,
    color: String,
    averageReview: Number,

    sizes: [
      {
        label: { type: String, required: true },
        price: { type: Number, required: true },
        salePrice: Number,
        stock: { type: Number, default: 0 },
      },
    ],

    shape: String,
    material: String,

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProductSchema.index({
  title: "text",
  description: "text",
});


module.exports = mongoose.model("Product", ProductSchema);
