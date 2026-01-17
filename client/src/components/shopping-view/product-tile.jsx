import { Star, ShoppingCart } from "lucide-react";

function ShoppingProductTile({ product, handleAddtoCart, onClick }) {
  const isOnSale = product?.salePrice > 0;
  const isLowStock = product?.totalStock > 0 && product?.totalStock < 3;
  const hasRating = product?.averageReview > 0;

  return (
    <div
      onClick={onClick}
      className="
        group
        bg-white
        border border-[#EEEEEE]
        rounded-sm
        overflow-hidden
        cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-[2px]
        hover:shadow-md
      "
    >
      {/* IMAGE */}
      <div className="relative h-[280px] bg-[#F3F3F3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.03]
          "
        />

        {/* SALE BADGE */}
        {isOnSale && (
          <span className="absolute top-3 left-3 bg-[#F4A300] text-white text-xs px-3 py-1">
            SALE
          </span>
        )}

        {/* LOW STOCK COUNT */}
        {isLowStock && (
          <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs px-3 py-1 border border-gray-300">
            Only {product.totalStock} left
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* CATEGORY */}
        <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2">
          {product.category}
        </p>

        {/* TITLE + RATING */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
            {product.title}
          </h3>

          {hasRating && (
            <div className="flex items-center gap-1 text-[#F4A300] shrink-0">
              <Star size={14} fill="#F4A300" />
              <span className="text-xs font-medium">
                {product.averageReview.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gray-200 mb-3" />

        {/* PRICE + CART */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {isOnSale && (
              <span className="text-xs line-through text-gray-400">
                ₹{product.price}
              </span>
            )}
            <span className="text-lg font-semibold text-gray-900">
              ₹{isOnSale ? product.salePrice : product.price}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product._id, product.totalStock);
            }}
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-full
              bg-gray-100
              text-gray-800
              transition-all duration-200
              hover:bg-gray-900 hover:text-white
              hover:scale-105
            "
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductTile;
