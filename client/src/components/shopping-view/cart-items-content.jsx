import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const price = cartItem?.price || 0;
  const quantity = cartItem?.quantity || 1;
  const maxStock = cartItem?.stock ?? Infinity;

  /* ================= INCREASE ================= */
  const handleIncrease = () => {
    if (!user?.id) return;
console.log(quantity,maxStock);
    if (quantity >= maxStock) {
      toast({
        title: `Only ${maxStock} in stock`,
        description: "You cannot add more than available stock.",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: cartItem.productId,
        size: cartItem.size,
        quantity: quantity + 1,
      })
    );
  };

  /* ================= DECREASE ================= */
  const handleDecrease = () => {
    if (!user?.id) return;

    if (quantity <= 1) return;

    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: cartItem.productId,
        size: cartItem.size,
        quantity: quantity - 1,
      })
    );
  };

  /* ================= DELETE ================= */
  const handleDelete = () => {
    dispatch(
      deleteCartItem({
        userId: user.id,
        productId: cartItem.productId,
        size: cartItem.size,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        toast({
          title: "Item removed",
          variant: "success",
        });
      }
    });
  };

  return (
    <div className="flex items-center gap-4 border-b pb-4">
      
      {/* IMAGE */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-md object-cover"
      />

      {/* DETAILS */}
      <div className="flex-1">
        <h3 className="font-semibold">{cartItem?.title}</h3>

        <span className="text-xs bg-muted px-2 py-1 rounded">
          Size: {cartItem?.size}
        </span>

        {/* QUANTITY CONTROLS */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={quantity <= 1}
            onClick={handleDecrease}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <span className="font-medium">{quantity}</span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={quantity >= maxStock}
            onClick={handleIncrease}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PRICE + DELETE */}
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹{(price * quantity).toFixed(2)}
        </p>

        <button
          onClick={handleDelete}
          className="mt-1 text-muted-foreground hover:text-red-500"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;