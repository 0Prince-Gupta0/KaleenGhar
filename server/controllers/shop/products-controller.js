const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const {
      sortBy = "price-lowtohigh",
      search,
      size,
      page = 1,
      limit = 50,
      ...rest
    } = req.query;

    const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);
    const safePage = Math.max(1, Number(page) || 1);
    const filters = {};

    // Apply filters
    Object.keys(rest).forEach((key) => {
      if (Array.isArray(rest[key])) {
        filters[key] = { $in: rest[key] };
      } else {
        filters[key] = { $in: [rest[key]] };
      }
    });

    if (size) {
      const sizesArray = Array.isArray(size) ? size : size.split(",");
      filters.sizes = {
        $elemMatch: {
          label: { $in: sizesArray },
        },
      };
    }

    // Search filter
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (safePage - 1) * safeLimit;

    const isPriceSort =
      sortBy === "price-lowtohigh" || sortBy === "price-hightolow";

    let products;
    let totalProducts;

    if (isPriceSort) {
      const sortDir = sortBy === "price-lowtohigh" ? 1 : -1;
      const pipeline = [
        { $match: filters },
        {
          $addFields: {
            minPrice: {
              $min: {
                $map: {
                  input: "$sizes",
                  as: "s",
                  in: {
                    $cond: [
                      { $gt: [{ $ifNull: ["$$s.salePrice", 0] }, 0] },
                      "$$s.salePrice",
                      "$$s.price",
                    ],
                  },
                },
              },
            },
          },
        },
        { $sort: { minPrice: sortDir } },
        { $skip: skip },
        { $limit: safeLimit },
      ];
      const [aggResult, countResult] = await Promise.all([
        Product.aggregate(pipeline),
        Product.countDocuments(filters),
      ]);
      products = aggResult;
      totalProducts = countResult;
    } else {
      let sort = {};
      switch (sortBy) {
        case "title-atoz":
          sort.title = 1;
          break;
        case "title-ztoa":
          sort.title = -1;
          break;
        default:
          sort.title = 1;
      }
      [products, totalProducts] = await Promise.all([
        Product.find(filters).sort(sort).skip(skip).limit(safeLimit),
        Product.countDocuments(filters),
      ]);
    }

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: safePage,
        totalPages: Math.ceil(totalProducts / safeLimit),
        totalProducts,
        limit: safeLimit,
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
