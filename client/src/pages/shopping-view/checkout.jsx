import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import {
  createNewOrder,
  createStripeCheckoutSession,
} from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import AddressDialog from "@/components/shopping-view/addressDialog";
import SavedAddresses from "@/components/shopping-view/savedAddresses";
import { deleteAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import EditAddressDialog from "@/components/shopping-view/editAddressDialog";

function ShoppingCheckout() {
  const dispatch = useDispatch();
  const { toast } = useToast();
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);

  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { stripeCheckoutURL, isLoading } = useSelector(
    (state) => state.shopOrder
  );
  const { addressList = [] } = useSelector(
    (state) => state.shopAddress
  );
const isCartEmpty = !cartItems?.items || cartItems.items.length === 0;

  /* ================= LOCAL STATE ================= */
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    useState(null);

  /* ================= FETCH ADDRESSES ================= */
  useEffect(() => {
    if (!user?.id) return;
    dispatch(fetchAllAddresses(user.id));
  }, [dispatch, user?.id]);

  /* ================= AUTO SELECT FIRST ADDRESS ================= */
  useEffect(() => {
    if (!currentSelectedAddress && addressList.length) {
      setCurrentSelectedAddress(addressList[0]);
    }
  }, [addressList]);

  /* ================= TOTAL ================= */
  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item.salePrice > 0
              ? item.salePrice
              : item.price) *
              item.quantity,
          0
        )
      : 0;

  /* ================= STRIPE REDIRECT ================= */
  useEffect(() => {
    if (stripeCheckoutURL) {
      window.location.href = stripeCheckoutURL;
    }
  }, [stripeCheckoutURL]);

  /* ================= STRIPE PAYMENT ================= */
  function handleStripePayment() {
    if (!cartItems?.items?.length) {
      toast({
        title: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Select delivery address",
        description: "Please choose an address to continue",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user.id,
      cartId: cartItems._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price:
          item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      paymentMethod: "stripe",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((res) => {
      if (res?.payload?.orderId) {
        dispatch(
          createStripeCheckoutSession({
            cartItems: orderData.cartItems,
            orderId: res.payload.orderId,
          })
        );
      } else {
        toast({
          title: "Order creation failed",
          variant: "destructive",
        });
      }
    });
  }

   const handleEditAddress = (address) => {
    //console.log("edit action");
    setEditingAddress(address); // ✅ correct variable
    setEditDialogOpen(true);
  };
  
  
    const handleDeleteAddress = (address) => {
     // console.log("delete action")
    dispatch(
      deleteAddress({
        userId: user.id,
        addressId: address._id,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchAllAddresses(user.id));
  
        if (currentSelectedAddress?._id === address._id) {
          setCurrentSelectedAddress(null);
        }
      }
    });
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-semibold mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* CART */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Your Cart Items
              </h2>

            {isCartEmpty ? (
  <div className="rounded-xl border bg-[#FFFDF8] p-8">
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-sm font-medium text-[#2B2B2B]">
        Your cart is empty
      </p>
      <p className="text-xs text-[#7A6F63] mt-1">
        Add items to your cart to continue checkout
      </p>
    </div>
  </div>
) : (
  cartItems.items.map((item) => (
    <div
      key={item.productId}
      className="rounded-xl border bg-white p-4 mb-4"
    >
      <UserCartItemsContent cartItem={item} />
    </div>
  ))
)}


            </div>

            {/* ADDRESS */}
            <div className="rounded-xl border bg-white p-5">
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="font-semibold">
                    Deliver To
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Choose a saved address
                  </p>
                </div>

                {/* ✅ ADD ONLY */}
                 <AddressDialog
  open={openAddressDialog}
  onOpenChange={setOpenAddressDialog}
  onAddressAdded={(addr) => {
    setCurrentSelectedAddress(addr);
    dispatch(fetchAllAddresses(user.id));
  }}
/>
              </div>

              {/* ✅ SELECT ONLY */}
              <SavedAddresses
                    selectedAddress={currentSelectedAddress}
                    setSelectedAddress={setCurrentSelectedAddress}
                    onEdit={handleEditAddress}
                    onDelete={handleDeleteAddress}
                  />
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="border bg-white p-6 rounded-xl sticky top-8">
              <h3 className="font-semibold mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span>₹{totalCartAmount}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalCartAmount}</span>
              </div>
<Button
  onClick={handleStripePayment}
  disabled={isLoading || isCartEmpty}
  className="w-full mt-6"
>

                {isLoading
                  ? "Redirecting…"
                  : "Pay with Stripe"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EditAddressDialog
  open={editDialogOpen}
  setOpen={setEditDialogOpen}
  address={editingAddress}
  onUpdated={(addr) => {setCurrentSelectedAddress(addr);
    dispatch(fetchAllAddresses(user.id));
  }}
/>
    </div>
  );
}

export default ShoppingCheckout;
