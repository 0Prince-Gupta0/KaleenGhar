import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
// import {
//   createNewOrder,
//   createStripeCheckoutSession,
// } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import AddressDialog from "@/components/shopping-view/addressDialog";
import SavedAddresses from "@/components/shopping-view/savedAddresses";
import { deleteAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import EditAddressDialog from "@/components/shopping-view/editAddressDialog";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


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
  // useEffect(() => {
  //   if (stripeCheckoutURL) {
  //     window.location.href = stripeCheckoutURL;
  //   }
  // }, [stripeCheckoutURL]);

  /* ================= STRIPE PAYMENT ================= */
  // function handleStripePayment() {
  //   if (!cartItems?.items?.length) {
  //     toast({
  //       title: "Your cart is empty",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   if (!currentSelectedAddress) {
  //     toast({
  //       title: "Select delivery address",
  //       description: "Please choose an address to continue",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   const orderData = {
  //     userId: user.id,
  //     cartId: cartItems._id,
  //     cartItems: cartItems.items.map((item) => ({
  //       productId: item.productId,
  //       title: item.title,
  //       image: item.image,
  //       price:
  //         item.salePrice > 0 ? item.salePrice : item.price,
  //       quantity: item.quantity,
  //     })),
  //     addressInfo: {
  //       addressId: currentSelectedAddress._id,
  //       address: currentSelectedAddress.address,
  //       city: currentSelectedAddress.city,
  //       pincode: currentSelectedAddress.pincode,
  //       phone: currentSelectedAddress.phone,
  //       notes: currentSelectedAddress.notes,
  //     },
  //     paymentMethod: "stripe",
  //     paymentStatus: "pending",
  //     totalAmount: totalCartAmount,
  //     orderDate: new Date(),
  //     orderUpdateDate: new Date(),
  //   };

  //   dispatch(createNewOrder(orderData)).then((res) => {
  //     if (res?.payload?.orderId) {
  //       dispatch(
  //         createStripeCheckoutSession({
  //           cartItems: orderData.cartItems,
  //           orderId: res.payload.orderId,
  //         })
  //       );
  //     } else {
  //       toast({
  //         title: "Order creation failed",
  //         variant: "destructive",
  //       });
  //     }
  //   });
  // }

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


const handleRazorpayPayment = async () => {
  try {
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
        description: "Please choose an address",
        variant: "destructive",
      });
      return;
    }

    // Load Razorpay SDK
    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      toast({
        title: "Razorpay SDK failed to load",
        variant: "destructive",
      });
      return;
    }

    // Create order
    const res = await fetch(`${BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        amount: totalCartAmount,
        cartItems: cartItems.items,
        address: currentSelectedAddress,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      toast({
        title: "Order creation failed",
        variant: "destructive",
      });
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.razorpayOrder.amount,
      currency: "INR",
      name: "Qaleen",
      description: "Order Payment",
      order_id: data.razorpayOrder.id,

      handler: async function (response) {
        const verifyRes = await fetch(
          `${BASE_URL}/api/payment/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          toast({ title: "Payment Successful 🎉" });

          // ✅ Redirect only (webhook handles DB)
          window.location.href = "/shop/payment-success";
        } else {
          toast({
            title: "Payment verification failed",
            variant: "destructive",
          });
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Payment popup closed by user");
          // ❌ NO API CALL HERE
          // Webhook will handle actual payment status
        },
      },

      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },

      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast({
      title: "Payment failed",
      description: err.message,
      variant: "destructive",
    });
  }
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
  onClick={handleRazorpayPayment}
  disabled={isLoading || isCartEmpty}
  className="w-full mt-6"
>

                {isLoading
                  ? "Redirecting…"
                  : "Pay with RazorPay"}
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
