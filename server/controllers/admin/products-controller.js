const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

/* ================= IMAGE UPLOAD ================= */
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

/* ================= ADD PRODUCT ================= */
const addProduct = async (req, res) => {
  try {
  //  console.log("REQ.BODY 👉", req.body);

    const {
      image,
      title,
      description,
      category,
      color,
      size,
      shape,
      material,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const product = new Product({
      image,
      title,
      description,
      category,
      color,
      size,
      shape,
      material,
      price: Number(price),
      salePrice: Number(salePrice || 0),
      totalStock: Number(totalStock),
      averageReview: Number(averageReview || 0),
    });

    await product.save();

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
};

/* ================= FETCH PRODUCTS ================= */
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

/* ================= EDIT PRODUCT ================= */
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      color,
      size,
      shape,
      material,
      price,
      salePrice,
      totalStock,
      averageReview,
      isFeatured
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (image !== undefined) product.image = image;
    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;
    if (color !== undefined) product.color = color;
    if (size !== undefined) product.size = size;
    if (shape !== undefined) product.shape = shape;
    if (material !== undefined) product.material = material;
    if (price !== undefined) product.price = Number(price);
    if (salePrice !== undefined) product.salePrice = Number(salePrice);
    if (totalStock !== undefined) product.totalStock = Number(totalStock);
    if (averageReview !== undefined)
      product.averageReview = Number(averageReview);
    if (isFeatured !== undefined) product.isFeatured=isFeatured;
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

/* ================= DELETE PRODUCT ================= */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
