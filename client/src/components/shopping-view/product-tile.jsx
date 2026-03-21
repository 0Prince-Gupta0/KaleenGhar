import { filterOptions } from "@/config";
import { Star, ShoppingCart } from "lucide-react";
function ShoppingProductTile({ product, handleAddtoCart, onClick }) {
  const sizes = product?.sizes || [];

  const prices = sizes.map((s) => Number(s.price));
  const salePrices = sizes
    .filter((s) => s.salePrice > 0)
    .map((s) => Number(s.salePrice));

  const minPrice = prices.length ? Math.min(...prices) : 0;
  const minSalePrice = salePrices.length ? Math.min(...salePrices) : null;

  const isOnSale = salePrices.length > 0;
  const hasRating = product?.averageReview > 0;

  const totalStock = sizes.reduce(
    (sum, s) => sum + Number(s.stock || 0),
    0
  );

  const isLowStock = totalStock > 0 && totalStock <= 5;

  return (
    <div
      onClick={onClick}
      className="
        group bg-white border border-[#EEE7DC]
        rounded-xl overflow-hidden
        cursor-pointer
        transition-all duration-300 ease-out
        active:scale-[0.98]
        hover:shadow-lg
      "
    >
      {/* IMAGE */}
      <div className="relative h-[180px] sm:h-[200px] bg-[#F3F3F3] overflow-hidden">

        {/* IMAGE */}
        <img
          src={product?.gallery?.[0] || "/placeholder.png"}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        {/* SALE BADGE */}
        {isOnSale && (
          <span className="absolute top-2 left-2 bg-[#C9A24D] text-black text-[10px] px-2 py-1 rounded-full font-medium shadow-sm">
            SALE
          </span>
        )}

        {/* LOW STOCK */}
        {isLowStock && (
          <span className="absolute top-2 right-2 bg-white text-gray-800 text-[10px] px-2 py-1 rounded-full border shadow-sm">
            Low Stock
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 space-y-2">

        {/* CATEGORY */}
        <p className="text-[10px] uppercase tracking-widest text-gray-400">
        {
  filterOptions.category.find(
    (item) => item.id === product?.category
  )?.label || ""}
        </p>

        {/* TITLE */}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[36px]">
          {product?.title}
        </h3>

        {/* RATING */}
        {hasRating && (
          <div className="flex items-center gap-1 text-[#C9A24D]">
            <Star size={12} fill="#C9A24D" />
            <span className="text-[11px] font-medium">
              {product.averageReview.toFixed(1)}
            </span>
          </div>
        )}

        {/* PRICE + CTA */}
        <div className="flex items-center justify-between pt-1">

          <div className="flex flex-col">
            {isOnSale && minSalePrice !== null && (
              <span className="text-[10px] line-through text-gray-400">
                ₹{minPrice}
              </span>
            )}

            <span className="text-base font-semibold text-[#1F2933]">
              ₹{isOnSale && minSalePrice ? minSalePrice : minPrice}
            </span>
          </div>

          {/* CTA BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddtoCart(product);
            }}
            className="
              flex items-center justify-center
              w-9 h-9
              rounded-full
              bg-[#F5EFE6]
              text-[#1F2933]
              shadow-sm
              transition-all duration-200
              active:scale-90
              hover:bg-[#1F2933] hover:text-white
            "
          >
            <ShoppingCart size={15} />
          </button>

        </div>
      </div>
    </div>
  );
}

export default ShoppingProductTile;