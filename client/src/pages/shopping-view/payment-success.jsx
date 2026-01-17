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

  useEffect(() => {
    if (!orderId || !sessionId) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/shop/order/verify-payment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, sessionId }),
          }
        );

        const data = await res.json();

        if (data.success) {
          // 🔥 THIS IS THE FIX
          dispatch(clearCart());
        }
      } catch (err) {
        console.error("Payment verification failed", err);
      }
    };

    verifyPayment();
  }, [orderId, sessionId, dispatch]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#FBF7F1] px-4">
      <Card className="max-w-lg w-full p-10 text-center rounded-2xl border shadow-lg bg-white">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-[#C9A24D]" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#1F2933]">
          Payment Successful
        </h1>

        <p className="mt-4 text-[#6B7280]">
          Thank you for your purchase. Your order is now confirmed.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate("/shop/account")}>
            View Orders
          </Button>

          <Button variant="outline" onClick={() => navigate("/shop/home")}>
            Continue Shopping
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
