
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRatingComponent from "@/components/common/star-rating";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useToast } from "@/components/ui/use-toast";

function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productDetails } = useSelector((state) => state.shopProducts);
  const { reviews = [] } = useSelector((state) => state.shopReview);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("description");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(getReviews(id));
  }, [dispatch, id]);

  /* ================= SYNC WITH PRODUCT ================= */
  useEffect(() => {
    if (productDetails?.gallery?.length) {
      setSelectedImage(productDetails.gallery[0]);
    }

    if (productDetails?.sizes?.length) {
      setSelectedSize(productDetails.sizes[0]);
    }
  }, [productDetails]);

  /* ================= DERIVED ================= */
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((s, r) => s + r.reviewValue, 0) / reviews.length;
  }, [reviews]);

  const price = selectedSize?.price || 0;
  const salePrice = selectedSize?.salePrice || 0;
  const isOnSale = salePrice > 0 && salePrice < price;

  const discountPercent = isOnSale
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.reviewValue) === star).length,
  }));

  const totalReviews = reviews.length || 1;

  /* ================= HANDLERS ================= */
  function handleAddToCart() {
  if (!user) {
    toast({
      title: "Login required",
      description: "Please login to add items to your cart",
      variant: "destructive",
    });
    navigate("/auth/login");
    return;
  }

  if (!selectedSize) {
    toast({ title: "Select a size", variant: "destructive" });
    return;
  }

  const existingItem = cartItems.find(
    (item) =>
      String(item.productId) === String(id) &&
      item.size === selectedSize.label
  );

  const existingQuantity = existingItem?.quantity || 0;

  if (existingQuantity + quantity > selectedSize.stock) {
    toast({
      title: "Stock limit reached",
      description: `Only ${selectedSize.stock} item${
        selectedSize.stock > 1 ? "s" : ""
      } available in stock.`,
      variant: "destructive",
    });
    return;
  }

  dispatch(
    addToCart({
      userId: user.id,
      productId: id,
      size: selectedSize.label,
      quantity,
    })
  ).then(() => {
    dispatch(fetchCartItems(user.id));
    toast({ title: "Added to cart", variant: "success" });
  });
}
  function handleAddReview() {
    if (!rating || !reviewMsg) return;

    dispatch(
      addReview({
        productId: id,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then(() => {
      dispatch(getReviews(id));
      setRating(0);
      setReviewMsg("");
      setShowReviewForm(false);
      toast({ title: "Review submitted", variant: "success" });
    });
  }

  if (!productDetails) return null;

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
      
      {/* ================= PRODUCT SECTION ================= */}
     <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16">
        
        {/* ===== GALLERY ===== */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-4">
            {productDetails.gallery?.map((img) => (
              <button
                key={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border ${
                  selectedImage === img
                    ? "ring-2 ring-[#C9A24D] border-[#C9A24D]"
                    : "border-[#E7E2DA]"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-3xl overflow-hidden border border-[#E7E2DA]">
            <img
              src={selectedImage}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ===== DETAILS ===== */}
        <div className="flex flex-col gap-8">
          
          {/* BADGES + TITLE */}
          <div className="space-y-5">
            <div className="flex gap-2">
              {isOnSale && (
                <span className="bg-[#C9A24D] text-black text-xs px-3 py-1 rounded-full font-medium">
                  Sale
                </span>
              )}

              {productDetails.isFeatured && (
                <span className="bg-[#4F6A73] text-white text-xs px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl font-semibold text-[#2E2E2E]">
              {productDetails.title}
            </h1>

            <div className="flex items-center gap-3">
              <StarRatingComponent rating={avgRating} />
              <span className="text-sm text-[#6B6B6B]">
                {reviews.length} reviews
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4">
              {isOnSale && (
                <span className="text-lg text-[#9A9A9A] line-through">
                  ₹{price}
                </span>
              )}

              <span className="text-3xl font-semibold text-[#C9A24D]">
                ₹{isOnSale ? salePrice : price}
              </span>

              {isOnSale && (
                <span className="bg-[#4F6A73] text-white text-xs px-2 py-1 rounded">
                  {discountPercent}% off
                </span>
              )}
            </div>
          </div>

          {/* SIZE */}
          <div className="space-y-3">
            <p className="text-sm text-[#6B6B6B]">
              Size:{" "}
              <span className="font-medium text-[#2E2E2E]">
                {selectedSize?.label}
              </span>
            </p>

            <div className="flex flex-wrap gap-3">
              {productDetails.sizes?.map((size) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size)}
                  disabled={size.stock === 0}
                  className={`px-5 py-2 rounded-full text-sm border transition
                    ${
                      selectedSize?.label === size.label
                        ? "bg-[#C9A24D] text-black border-[#C9A24D]"
                        : "bg-white border-[#E7E2DA]"
                    }
                    ${size.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY + CTA */}
          <div className="flex items-center gap-5">
            <div className="flex items-center border border-[#E7E2DA] rounded-md overflow-hidden bg-white">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3">−</button>
              <span className="px-5">{quantity}</span>
              <button onClick={() => setQuantity(q => {  if (!selectedSize) return q;

          if (q >= selectedSize.stock) {
            toast({
              title: "Stock limit reached",
              description: `Only ${selectedSize.stock} item${
                selectedSize.stock > 1 ? "s" : ""
              } available. Please check back soon.`,
              variant: "destructive",
            });
            return q;
          }

          return q + 1;
              })} className="px-4 py-3">+</button>
            </div>

            <Button onClick={handleAddToCart} className="flex-1 py-6 bg-[#C9A24D] text-black">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>


      {/* ================= ACCORDION ================= */}
  <div className="border-t border-[#E7E2DA] pt-12 space-y-6">

  {["description","care","shipping"].map(section => {
    const isOpen = openSection === section;

    return (
      <div
        key={section}
        className="border-b border-[#E7E2DA] pb-6"
      >
        <button
          onClick={() => setOpenSection(isOpen ? null : section)}
          className="w-full flex justify-between items-center text-left group"
        >
          <h3 className={`
            text-lg font-medium transition
            ${isOpen ? "text-[#C9A24D]" : "text-[#2E2E2E]"}
          `}>
            {section === "description"
              ? "Description"
              : section === "care"
              ? "Rug Care & Maintenance"
              : "Shipping Policy"}
          </h3>

          <span className={`
            text-xl transition
            ${isOpen ? "text-[#C9A24D]" : "text-[#6B6B6B]"}
          `}>
            {isOpen ? "−" : "+"}
          </span>
        </button>

        {isOpen && (
          <div className="mt-4 text-[#6B6B6B] leading-relaxed max-w-3xl">
            {section === "description" && productDetails.description}

            {section === "care" && (
              <>
                Vacuum your rug regularly to remove dust and debris.  
                Spot clean using a mild detergent and avoid excessive moisture.  
                Professional cleaning once a year helps maintain texture and color.
              </>
            )}

            {section === "shipping" && (
              <>
                Orders are dispatched within 24–48 hours.  
                Delivery typically takes 3–5 business days depending on location.  
                Custom rugs may require additional processing time.
              </>
            )}
          </div>
        )}
      </div>
    );
  })}

</div>

      {/* ================= REVIEWS ================= */}
 <div className="space-y-14">

  {/* ===== SECTION TITLE ===== */}
  <h2 className="text-2xl font-semibold text-center text-[#2E2E2E]">
    Customer Reviews
  </h2>

  {/* ===== SUMMARY ===== */}
  <div className="grid md:grid-cols-3 gap-10 items-center border-b border-[#E7E2DA] pb-12">

    {/* AVG RATING */}
    <div className="text-center space-y-2">
      <StarRatingComponent rating={avgRating} />
      <p className="font-medium text-[#2E2E2E]">
        {avgRating.toFixed(1)} out of 5
      </p>
      <p className="text-sm text-[#6B6B6B]">
        {reviews.length} reviews
      </p>
    </div>

    {/* DISTRIBUTION */}
    <div className="space-y-2">
      {ratingCounts.map(({ star, count }) => (
        <div key={star} className="flex items-center gap-3">
          <span className="w-6 text-sm text-[#2E2E2E]">{star}★</span>

          <div className="flex-1 h-2 bg-[#E7E2DA] rounded">
            <div
              className="h-2 bg-[#C9A24D] rounded"
              style={{ width: `${(count / totalReviews) * 100}%` }}
            />
          </div>

          <span className="text-xs text-[#6B6B6B]">{count}</span>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center">
      <Button
        onClick={() => setShowReviewForm(prev => !prev)}
        className="bg-[#4F6A73] hover:bg-[#3E565E] text-white rounded-full px-8 py-3"
      >
        Write a review
      </Button>
    </div>

  </div>

  {/* ===== EMPTY STATE ===== */}
  {reviews.length === 0 && (
    <div className="text-center py-14 space-y-2">
      <p className="font-medium text-[#2E2E2E]">No reviews yet</p>
      <p className="text-sm text-[#6B6B6B]">
        Be the first to share your experience
      </p>
    </div>
  )}

  {/* ===== REVIEW LIST ===== */}
  <div className="space-y-10">
    {reviews.map(r => (
      <div
        key={r._id}
        className="border-b border-[#E7E2DA] pb-8"
      >
        <div className="flex justify-between items-start">
          
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback>
                {r.userName?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium text-[#2E2E2E]">
                {r.userName}
              </p>
              <StarRatingComponent rating={r.reviewValue} />
            </div>
          </div>

          <span className="text-xs text-[#6B6B6B]">
            {new Date(r.createdAt || Date.now()).toLocaleDateString()}
          </span>

        </div>

        <p className="mt-3 text-[#6B6B6B] leading-relaxed">
          {r.reviewMessage}
        </p>
      </div>
    ))}
  </div>

  {/* ===== REVIEW FORM ===== */}
  {user && showReviewForm && (
    <div className="mt-6 max-w-md space-y-4">

      <StarRatingComponent
        rating={rating}
        handleRatingChange={setRating}
      />

      <Input
        value={reviewMsg}
        onChange={(e) => setReviewMsg(e.target.value)}
        placeholder="Share your thoughts"
        className="border-[#E7E2DA] focus-visible:ring-[#C9A24D]"
      />

      <Button
        onClick={handleAddReview}
        className="bg-[#C9A24D] hover:bg-[#B8953F] text-black font-medium"
      >
        Submit review
      </Button>

    </div>
  )}

</div>
    </div>
  );
}

export default ProductDetailsPage;

