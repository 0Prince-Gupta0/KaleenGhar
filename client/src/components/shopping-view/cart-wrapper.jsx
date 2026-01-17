import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems = [], setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount = cartItems.reduce((sum, item) => {
    const price =
      item?.salePrice && item.salePrice > 0
        ? item.salePrice
        : item?.price || 0;

    const quantity = item?.quantity || 0;

    return sum + price * quantity;
  }, 0);

  return (
    <SheetContent className="sm:max-w-md">
      {/* ================= HEADER ================= */}
      <SheetHeader>
        <SheetTitle className="text-lg font-semibold">
          Your Cart
        </SheetTitle>
      </SheetHeader>

      {/* ================= ITEMS ================= */}
      <div className="mt-8 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent
              key={item.productId || item._id}
              cartItem={item}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Your cart is empty
          </p>
        )}
      </div>

      {/* ================= TOTAL ================= */}
      <div className="mt-8">
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>₹{totalCartAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <Button
        disabled={cartItems.length === 0}
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
