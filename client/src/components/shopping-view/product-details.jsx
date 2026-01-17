import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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

  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { user } = useSelector((state) => state.auth);

  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(getReviews(id));
  }, [dispatch, id]);

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

    const items = cartItems?.items || [];
    const existing = items.find((i) => i.productId === id);

    if (
      existing &&
      existing.quantity + 1 > productDetails.totalStock
    ) {
      toast({
        title: "Stock limit reached",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: id,
        quantity: 1,
      })
    ).then(() => {
      dispatch(fetchCartItems(user?.id));
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

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* TOP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* IMAGE */}
        <div className="bg-[#F8F5F0] p-8 rounded-3xl">
          <img
            src={productDetails.image}
            alt={productDetails.title}
            className="w-full aspect-square object-cover rounded-2xl"
          />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold">
            {productDetails.title}
          </h1>

          <div className="mt-2 flex items-center gap-3">
            <StarRatingComponent rating={avgRating} />
            <span className="text-sm text-muted-foreground">
              ({reviews.length} reviews)
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-[#C9A24D]">
              ₹{productDetails.salePrice || productDetails.price}
            </span>
            {productDetails.salePrice && (
              <span className="line-through text-muted-foreground">
                ₹{productDetails.price}
              </span>
            )}
          </div>

          <p className="mt-4 text-muted-foreground">
            {productDetails.description}
          </p>

          <Button
            className="mt-8 py-6 text-lg w-full bg-[#1F2933]"
            disabled={productDetails.totalStock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* REVIEWS */}
      <Separator className="my-16" />

      <h2 className="text-2xl font-bold mb-8">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white border rounded-xl p-6"
          >
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>
                  {r.userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{r.userName}</p>
                <StarRatingComponent rating={r.reviewValue} />
                <p className="text-sm text-muted-foreground mt-2">
                  {r.reviewMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD REVIEW */}
      {user && (
        <div className="mt-12 max-w-xl">
          <h3 className="font-semibold mb-3">Write a review</h3>
          <StarRatingComponent
            rating={rating}
            handleRatingChange={setRating}
          />
          <Input
            className="mt-3"
            value={reviewMsg}
            onChange={(e) => setReviewMsg(e.target.value)}
            placeholder="Share your experience"
          />
          <Button
            className="mt-4 bg-[#C9A24D]"
            onClick={handleAddReview}
          >
            Submit Review
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;
