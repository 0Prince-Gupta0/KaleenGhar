import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
function handleUpdateQuantity(type) {
  if (!cartItem || !user?.id) return;

  const currentQty = cartItem.quantity;

  if (type === "minus" && currentQty <= 1) return;

  if (type === "plus") {
    if (!product) {
      toast({
        title: "Product data not loaded",
        variant: "destructive",
      });
      return;
    }

    if (currentQty >= product.totalStock) {
      toast({
        title: `Only ${product.totalStock} items available`,
        variant: "destructive",
      });
      return;
    }
  }

  dispatch(
    updateCartQuantity({
      userId: user.id,
      productId: cartItem.productId,
      quantity: type === "plus" ? currentQty + 1 : currentQty - 1,
    })
  ).then((res) => {
    if (res?.payload?.success) {
      toast({
        title: "Cart updated",
        variant: "success",
      });
    }
  });
}


  function handleDelete() {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: cartItem.productId,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        toast({ title: "Item removed from cart" , variant: "success",});
      }
    });
  }

  const itemPrice =
    cartItem?.salePrice && cartItem.salePrice > 0
      ? cartItem.salePrice
      : cartItem.price;


      const product = productList?.find(
  (p) => p._id === cartItem.productId
);

const maxStock = product?.totalStock ?? Infinity;
const isOutOfStock = cartItem.quantity >= maxStock;

  return (
    <div className="flex items-center gap-4">
      {/* IMAGE */}
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded-md object-cover"
      />

      {/* DETAILS */}
      <div className="flex-1">
        <h3 className="font-semibold leading-tight">
          {cartItem?.title}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItem.quantity <= 1}
            onClick={() => handleUpdateQuantity("minus")}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <span className="font-medium">{cartItem.quantity}</span>

        <Button
  variant="outline"
  size="icon"
  className="h-8 w-8 rounded-full"
  disabled={isOutOfStock}
  onClick={() => handleUpdateQuantity("plus")}
>

            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PRICE + DELETE */}
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ₹{(itemPrice * cartItem.quantity).toFixed(2)}
        </p>

        <button
          onClick={handleDelete}
          className="mt-1 text-muted-foreground hover:text-red-500 transition"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
