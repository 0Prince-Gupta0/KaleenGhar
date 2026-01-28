const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const {
      sortBy = "price-lowtohigh",
      search,
      page = 1,
      limit = 50,
      ...rest
    } = req.query;

    const filters = {};

    // Apply filters
    Object.keys(rest).forEach((key) => {
      if (Array.isArray(rest[key])) {
        filters[key] = { $in: rest[key] };
      } else {
        filters[key] = { $in: [rest[key]] };
      }
    });

    // Search filter
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Total count (important for pagination UI)
    const totalProducts = await Product.countDocuments(filters);

    const products = await Product.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getFilteredProducts,
  getProductDetails,
  getFeaturedProducts,
};
