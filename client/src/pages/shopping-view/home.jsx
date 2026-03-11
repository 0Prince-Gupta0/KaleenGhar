import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { getFeatureImages } from "@/store/common-slice";
import Testimonials from "@/components/shopping-view/testimonials";
import WhyQaleenGhar from "@/components/shopping-view/whyKaleenGhar";
import SignatureCollections from "@/components/shopping-view/signatureCollections";
import Footer from "@/components/shopping-view/footer";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const { productList } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
const [hero, setHero] = useState(null);

const [featuredProducts, setFeaturedProducts] = useState([]);

useEffect(() => {
  fetchFeaturedProducts();
}, []);

const fetchFeaturedProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/shop/products/featured`);
    setFeaturedProducts(res.data.products);
  } catch (error) {
    console.error("Failed to fetch featured products", error);
  }
};

useEffect(() => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/api/common/hero`, {
    credentials: "include",
  })
    .then((res) => res.ok ? res.json() : Promise.reject(new Error("Failed to fetch")))
    .then((data) => setHero(data))
    .catch((err) => console.error("Hero fetch failed:", err));
}, []);
  /* -------------------- CAROUSEL -------------------- */
  function startAutoSlide() {
    if (!featureImageList?.length) return;

    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % featureImageList.length
      );
    }, 3000);
  }

  function stopAutoSlide() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  /* -------------------- ADD TO CART -------------------- */
  function handleAddtoCart(product) {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    const productId = typeof product === "string" ? product : product?._id;
    const size = product?.sizes?.[0]?.label;
    if (!productId || !size) {
      toast({
        title: "Select size",
        description: "Please open the product to choose a size",
        variant: "destructive",
      });
      navigate(`/shop/product/${productId}`);
      return;
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        size,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Added to cart", variant: "success" });
      } else {
        toast({
          title: res?.payload?.message || "Failed to add to cart",
          variant: "destructive",
        });
      }
    }).catch(() => {
      toast({ title: "Failed to add to cart", variant: "destructive" });
    });
  }

  /* -------------------- EFFECTS -------------------- */
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col bg-[#FBF7F1]">
      {/* ================= HERO ================= */}
      <section
        className="relative h-[85vh] overflow-hidden"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        {featureImageList?.map((slide, index) => (
          <img
            key={index}
            src={slide?.image}
            alt="Qaleen Ghar banner"
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000
              ${index === currentSlide ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}

        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-[0.35em] uppercase text-[#E0C36A] mb-4">
            Qaleen Ghar
          </p>

         <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl">
  {hero?.title || "Handcrafted Carpets"}
  <br />
  {hero?.subtitle || "for Royal Living"}
</h1>

<p className="mt-6 text-lg text-gray-200 max-w-xl">
  {hero?.description ||
    "Timeless designs woven with heritage & elegance."}
</p>


          <Button
            onClick={() => navigate("/shop/listing")}
            className="mt-8 px-10 py-6 bg-[#C9A24D] hover:bg-[#B08B3C] text-black rounded-full"
          >
            Explore Collection
          </Button>
        </div>

        {/* Controls */}
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous slide"
          onClick={() =>{
            setCurrentSlide(
              (prev) =>
                (prev - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          }
          className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/80 z-20"
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          variant="outline"
          size="icon"
          aria-label="Next slide"
          onClick={() =>{
            setCurrentSlide(
              (prev) => (prev + 1) % featureImageList.length
            )
          }
          }
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/80 z-20"
        >
          <ChevronRightIcon />
        </Button>
      </section>

      {/* ================= SIGNATURE ================= */}
      <SignatureCollections />

      {/* ================= FEATURED PRODUCTS ================= */}
     <section className="py-28 bg-[#FFFCF7]">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-20">
      <span className="text-xs tracking-widest uppercase text-[#C9A24D]">
        Handcrafted Excellence
      </span>
      <h2 className="text-4xl md:text-5xl font-bold mt-4">
        Featured Collection
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
      {featuredProducts.length > 0 ? (
        featuredProducts.map((product) => (
          <ShoppingProductTile
            key={product._id}
            product={product}
            handleAddtoCart={handleAddtoCart}
            onClick={() =>
              navigate(`/shop/product/${product._id}`)
            }
          />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">
          No featured products available
        </p>
      )}
    </div>

    <div className="flex justify-center mt-20">
      <Button
        onClick={() => navigate("/shop/listing")}
        className="px-10 py-4 bg-[#C9A24D] text-black rounded-full"
      >
        Explore Full Collection
      </Button>
    </div>

  </div>
</section>


      <WhyQaleenGhar />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default ShoppingHome;
