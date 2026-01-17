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
  const { toast } = useToast();
const navigate = useNavigate();
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews = [] } = useSelector((state) => state.shopReview);
  const { user } = useSelector((state) => state.auth);

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(getReviews(id));
  }, [dispatch, id]);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (
      reviews.reduce((s, r) => s + r.reviewValue, 0) / reviews.length
    );
  }, [reviews]);

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

    dispatch(
      addToCart({
        userId: user.id,
        productId: id,
        quantity: 1,
      })
    ).then(() => {
      dispatch(fetchCartItems(user.id));
      toast({ title: "Added to cart" , variant: "success",});
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
      toast({ title: "Review submitted", variant: "success", });
    });
  }

  if (!productDetails) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* ================= PRODUCT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20">
        {/* IMAGE */}
        <div className="rounded-3xl overflow-hidden bg-neutral-100">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-semibold">
              {productDetails.title}
            </h1>

            <div className="mt-3 flex items-center gap-4">
              <StarRatingComponent rating={avgRating} />
              <span className="text-sm text-neutral-500">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-semibold text-[#C9A24D]">
              ₹{productDetails.salePrice || productDetails.price}
            </span>
          </div>

          <p className="text-neutral-600 max-w-md">
            {productDetails.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["Color", productDetails.color],
              ["Size", productDetails.size],
              ["Shape", productDetails.shape],
              ["Material", productDetails.material],
            ].map(([label, value]) => (
              <div key={label} className="border rounded-xl p-4">
                <p className="text-xs uppercase text-neutral-500">
                  {label}
                </p>
                <p className="font-medium mt-1">{value}</p>
              </div>
            ))}
          </div>

          <Button
            onClick={handleAddToCart}
            className="
              py-5
              rounded-xl
              bg-[#C9A24D]
              hover:bg-[#b8953f]
              text-black
            "
          >
            Add to cart
          </Button>
        </div>
      </div>

      {/* ================= REVIEWS (BOTTOM) ================= */}
      <div className="mt-28 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">
          Reviews
        </h2>

        {reviews.length === 0 && (
          <div className="rounded-2xl bg-[#F8F5F0] p-8">
            <p className="text-lg font-medium">
              No reviews yet
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Be the first to share your experience
            </p>

            {user && (
              <div className="mt-6 space-y-4 max-w-md">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={setRating}
                />

                <Input
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Write your review"
                />

                <Button
                  onClick={handleAddReview}
                  className="bg-[#C9A24D] text-black"
                >
                  Submit review
                </Button>
              </div>
            )}
          </div>
        )}

        {reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="border rounded-2xl p-6"
              >
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {r.userName?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{r.userName}</p>
                    <StarRatingComponent rating={r.reviewValue} />
                    <p className="text-sm text-neutral-600 mt-2">
                      {r.reviewMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
