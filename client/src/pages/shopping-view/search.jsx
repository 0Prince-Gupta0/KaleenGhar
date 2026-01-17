import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector(
    (state) => state.shopSearch
  );
  const { productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const [, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  /* ================= DEBOUNCED SEARCH ================= */
  useEffect(() => {
    if (!keyword.trim()) {
      dispatch(resetSearchResults());
      setSearchParams({});
      return;
    }

    if (keyword.trim().length < 3) return;

    setIsTyping(true);

    const timer = setTimeout(() => {
      dispatch(getSearchResults(keyword.trim()));
      setSearchParams({ keyword: keyword.trim() });
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, dispatch, setSearchParams]);

  /* ================= ADD TO CART ================= */
  function handleAddtoCart(productId, totalStock) {
    const items = cartItems?.items || [];
    const existing = items.find((i) => i.productId === productId);

    if (existing && existing.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existing.quantity} quantity can be added`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Added to cart" , variant: "success",});
      }
    });
  }

  /* ================= PRODUCT DETAILS ================= */
  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  /* ================= UI STATES ================= */
  const showEmptyState =
    keyword.trim().length >= 3 &&
    !isLoading &&
    !searchResults.length;

  return (
  <div className="bg-[#FBF7F1] min-h-[calc(100vh-64px)]">
    {/* ================= HERO SEARCH ================= */}
    <section className="pt-20 pb-14 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2933]">
        Find Your Perfect Carpet
      </h1>
      <p className="mt-4 text-[#6B7280] max-w-xl mx-auto">
        Search across handcrafted carpets by style, material, color or design.
      </p>

      {/* SEARCH INPUT */}
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search handcrafted carpets, wool, shaggy, modern..."
          className="
            py-7 px-6
            text-base
            rounded-2xl
            bg-white
            border border-[#E6DED1]
            shadow-sm
            focus-visible:ring-[#C9A24D]
          "
        />
        <p className="text-xs text-[#6B7280] mt-3">
          Type at least 3 characters to search
        </p>
      </div>

   
    </section>

    {/* ================= RESULTS ================= */}
    <section className="max-w-7xl mx-auto px-4 pb-16">
      {isTyping || isLoading ? (
        <p className="text-center text-[#6B7280] text-lg">
          Searching…
        </p>
      ) : showEmptyState ? (
        <p className="text-center text-[#6B7280] text-lg">
          No products found for “{keyword}”
        </p>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults.map((product) => (
          <ShoppingProductTile
            key={product._id}
            product={product}
            handleAddtoCart={handleAddtoCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
    </section>

    {/* ================= DETAILS MODAL ================= */}
    <ProductDetailsDialog
      open={openDetailsDialog}
      setOpen={setOpenDetailsDialog}
      productDetails={productDetails}
    />
  </div>
);

}

export default SearchProducts;
