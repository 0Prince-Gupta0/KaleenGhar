import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/shop/cart-slice";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");
  const fromRazorpay = searchParams.get("from") === "razorpay";

  useEffect(() => {
    if (fromRazorpay) {
      dispatch(clearCart());
      return;
    }
    if (!orderId || !sessionId) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/shop/order/verify-payment`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, sessionId }),
        });

        const data = await res.json();

        if (data.success) {
          dispatch(clearCart());
        }
      } catch (err) {
        console.error("Payment verification failed", err);
      }
    };

    verifyPayment();
  }, [orderId, sessionId, fromRazorpay, dispatch]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#FBF7F1] px-4 sm:px-6">

      <Card className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 lg:p-10 text-center rounded-2xl border shadow-lg bg-white">

        {/* Icon */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[#C9A24D]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2933]">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#6B7280] px-2 sm:px-4">
          Thank you for your purchase. Your order is now confirmed.
        </p>

        {/* Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">

          <Button
            onClick={() => navigate("/shop/account")}
            className="w-full sm:w-auto"
          >
            View Orders
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/shop/home")}
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>

        </div>

      </Card>
    </div>
  );
}

export default PaymentSuccessPage;