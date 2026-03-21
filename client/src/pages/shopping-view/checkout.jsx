import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AddressDialog from "@/components/shopping-view/addressDialog";
import SavedAddresses from "@/components/shopping-view/savedAddresses";
import { deleteAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import { clearCart } from "@/store/shop/cart-slice";
import EditAddressDialog from "@/components/shopping-view/editAddressDialog";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/* ================= RAZORPAY LOADER ================= */
const loadRazorpayScript = () =>
new Promise((resolve) => {
const script = document.createElement("script");
script.src = "https://checkout.razorpay.com/v1/checkout.js";
script.onload = () => resolve(true);
script.onerror = () => resolve(false);
document.body.appendChild(script);
});

function ShoppingCheckout() {
const dispatch = useDispatch();
const { toast } = useToast();

const { cartItems } = useSelector((state) => state.shopCart); // ✅ ARRAY
const { user } = useSelector((state) => state.auth);
const { addressList = [] } = useSelector((state) => state.shopAddress);

const [openAddressDialog, setOpenAddressDialog] = useState(false);
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);
const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);

/* ================= EMPTY CHECK ================= */
const isCartEmpty = !cartItems || cartItems.length === 0;

/* ================= FETCH ADDRESSES ================= */
useEffect(() => {
if (user?.id) dispatch(fetchAllAddresses(user.id));
}, [dispatch, user?.id]);

/* ================= AUTO SELECT FIRST ADDRESS ================= */
useEffect(() => {
if (!currentSelectedAddress && addressList.length) {
setCurrentSelectedAddress(addressList[0]);
}
}, [addressList]);

/* ================= TOTAL ================= */
const totalCartAmount = cartItems?.length
? cartItems.reduce(
(sum, item) => sum + item.price * item.quantity,
0
)
: 0;

/* ================= ADDRESS ACTIONS ================= */
const handleEditAddress = (address) => {
setEditingAddress(address);
setEditDialogOpen(true);
};

const handleDeleteAddress = (address) => {
dispatch(
deleteAddress({
userId: user.id,
addressId: address._id,
})
).then((res) => {
if (res?.payload?.success) {
dispatch(fetchAllAddresses(user.id));
if (currentSelectedAddress?._id === address._id)
setCurrentSelectedAddress(null);
}
});
};

/* ================= RAZORPAY ================= */
const handleRazorpayPayment = async () => {
try {
if (isCartEmpty)
return toast({ title: "Cart is empty", variant: "destructive" });

  if (!currentSelectedAddress)
    return toast({
      title: "Select address",
      variant: "destructive",
    });

  const sdkLoaded = await loadRazorpayScript();
  if (!sdkLoaded)
    return toast({
      title: "Payment SDK failed",
      variant: "destructive",
    });

  const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: totalCartAmount,
      cartItems,
      address: { ...currentSelectedAddress, userId: user?.id },
    }),
  });

  const data = await res.json();
  if (!data.success)
    return toast({
      title: "Order creation failed",
      variant: "destructive",
    });

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: data.razorpayOrder.amount,
    currency: "INR",
    name: "Qaleen",
    description: "Order Payment",
    order_id: data.razorpayOrder.id,

    handler: async (response) => {
      const verifyRes = await fetch(
        `${BASE_URL}/api/payment/verify`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        }
      );

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        toast({ title: "Payment Successful 🎉" });
        dispatch(clearCart());
        window.location.href = "/shop/payment-success?from=razorpay";
      } else {
        toast({
          title: "Verification failed",
          variant: "destructive",
        });
      }
    },

    theme: { color: "#000000" },
  };

  new window.Razorpay(options).open();
} catch (err) {
  toast({
    title: "Payment error",
    description: err.message,
    variant: "destructive",
  });
}

};

/* ================= UI ================= */
return ( 
<div className="min-h-screen bg-[#FAF7F2] py-10"> <div className="mx-auto max-w-6xl px-4"> <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT */}
<div className="lg:col-span-2 space-y-6 sm:space-y-8">

  {/* CART */}
  <div>
    <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
      Your Cart Items
    </h2>

    {isCartEmpty ? (
      <div className="rounded-xl border bg-[#FFFDF8] p-6 sm:p-8 text-center">
        <p className="text-sm font-medium">
          Your cart is empty
        </p>
      </div>
    ) : (
      cartItems.map((item) => (
        <div
          key={`${item.productId}-${item.size}`}
          className="rounded-xl border bg-white p-3 sm:p-4 mb-3 sm:mb-4"
        >
          <UserCartItemsContent cartItem={item} />
        </div>
      ))
    )}
  </div>

  {/* ADDRESS */}
  <div className="rounded-xl border bg-white p-4 sm:p-5">
    
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      
      <div>
        <h3 className="font-semibold text-base sm:text-lg">
          Deliver To
        </h3>
        <p className="text-xs text-muted-foreground">
          Choose address
        </p>
      </div>

      <AddressDialog
        open={openAddressDialog}
        onOpenChange={setOpenAddressDialog}
        onAddressAdded={(addr) => {
          setCurrentSelectedAddress(addr);
          dispatch(fetchAllAddresses(user.id));
        }}
      />
    </div>

    <div className="overflow-hidden">
      <SavedAddresses
        selectedAddress={currentSelectedAddress}
        setSelectedAddress={setCurrentSelectedAddress}
        onEdit={handleEditAddress}
        onDelete={handleDeleteAddress}
      />
    </div>

  </div>
</div>

      {/* RIGHT */}
     <div>
  <div className="
    border bg-white 
    p-4 sm:p-6 
    rounded-xl 
    lg:sticky lg:top-8
  ">
    
    <h3 className="font-semibold text-base sm:text-lg mb-4">
      Order Summary
    </h3>

    <div className="flex justify-between text-sm sm:text-base mb-3">
      <span>Subtotal</span>
      <span className="font-medium">₹{totalCartAmount}</span>
    </div>

    <div className="border-t pt-3 flex justify-between font-semibold text-sm sm:text-base">
      <span>Total</span>
      <span>₹{totalCartAmount}</span>
    </div>
<p className="mt-2 text-xs text-gray-500">
  *Delivery charges, if applicable, will be payable upon delivery.
</p>
    <Button
      onClick={handleRazorpayPayment}
      disabled={isCartEmpty}
      className="w-full mt-5 sm:mt-6 h-10 sm:h-11 text-sm sm:text-base"
    >
      Pay with RazorPay
    </Button>
    
  </div>
</div>

    </div>
  </div>

  <EditAddressDialog
    open={editDialogOpen}
    setOpen={setEditDialogOpen}
    address={editingAddress}
    onUpdated={(addr) => {
      setCurrentSelectedAddress(addr);
      dispatch(fetchAllAddresses(user.id));
    }}
  />
</div>

);
}

export default ShoppingCheckout;
