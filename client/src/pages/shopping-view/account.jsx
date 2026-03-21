import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, MapPin } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatusDot from "@/components/common/status-dots";
import AddressDialog from "@/components/shopping-view/addressDialog";
import SavedAddresses from "@/components/shopping-view/savedAddresses";

import { ORDER_FLOW } from "@/config";
import { getAllOrdersByUserId } from "@/store/shop/order-slice";
import {
  fetchAllAddresses,
  deleteAddress,
} from "@/store/shop/address-slice";
import EditAddressDialog from "@/components/shopping-view/editAddressDialog";

function ShoppingAccount() {
  const dispatch = useDispatch();

  /* ================= REDUX ================= */
  const { user } = useSelector((state) => state.auth);
  const { orderList: orders = [] } = useSelector(
    (state) => state.shopOrder
  );
  const { addressList = [], isLoading: isAddressLoading } =
    useSelector((state) => state.shopAddress);

  /* ================= UI STATE ================= */
  const [activeTab, setActiveTab] = useState("orders");

  // orders
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [openOrder, setOpenOrder] = useState(null);
const [editDialogOpen, setEditDialogOpen] = useState(false);
const [editingAddress, setEditingAddress] = useState(null);

  // addresses
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    useState(null);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  // const [editingAddress, setEditingAddress] = useState(null);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    if (!user?.id) return;
    dispatch(getAllOrdersByUserId(user.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (activeTab !== "address" || !user?.id) return;
    dispatch(fetchAllAddresses(user.id));
   
  }, [activeTab, dispatch, user]);

  useEffect(() => {
    if (!currentSelectedAddress && addressList.length) {
      setCurrentSelectedAddress(addressList[0]);
    }
  }, [addressList]);

  /* ================= HANDLERS ================= */

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

// useEffect(()=>{
// console.log(editingAddress);
// },[editingAddress])

  /* ================= FILTERS ================= */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        String(order.totalAmount).includes(search);

      const matchStatus =
        status === "all" || order.orderStatus === status;

      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);

  /* ================= UI ================= */
//  console.log(addressList);
  return (
  <section className="bg-[#FFFCF7] min-h-screen py-8 md:py-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    
    {/* HEADER */}
    <header className="mb-8 md:mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2933]">
        My Account
      </h1>
      <p className="text-sm text-[#6B7280] mt-1">
        Welcome back{user?.userName ? `, ${user.userName}` : ""}
      </p>
    </header>

    {/* MAIN GRID */}
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 md:gap-8">
      
      {/* SIDEBAR */}
      <aside className="
        bg-white border border-[#E6DED1] rounded-2xl p-2 md:p-3 h-fit
        flex md:flex-col gap-2
        overflow-x-auto md:overflow-visible
      ">
        <SidebarItem
          active={activeTab === "orders"}
          icon={<Package className="h-4 w-4" />}
          label="My Orders"
          onClick={() => setActiveTab("orders")}
        />
        <SidebarItem
          active={activeTab === "address"}
          icon={<MapPin className="h-4 w-4" />}
          label="Addresses"
          onClick={() => setActiveTab("address")}
        />
      </aside>

      {/* CONTENT */}
      <main className="bg-white border border-[#E6DED1] rounded-2xl p-4 sm:p-6 md:p-8">
        
        {/* ================= ORDERS ================= */}
        {activeTab === "orders" && (
          <>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
              Order History
            </h2>

            {/* FILTERS */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                placeholder="Search order ID or amount"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-[260px]"
              />

               <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full sm:w-[200px] bg-[#FFFCF7] border border-[#E6DED1]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
              
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
              
                    {Object.entries(ORDER_FLOW).map(([k, v]) => (
                      <SelectItem key={k} value={k}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>

            {/* ORDERS LIST */}
            <div className="space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                  <Package className="h-10 w-10 text-[#C9A24D] mb-3" />
                  <p className="text-sm font-medium text-[#2B2B2B]">
                    No orders found
                  </p>
                  <p className="text-xs text-[#7A6F63] mt-1">
                    You haven’t placed any orders yet or no orders match your filter
                  </p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order._id}
                    className="
                      flex flex-col sm:flex-row
                      sm:items-center justify-between
                      gap-4
                      border rounded-xl p-4
                    "
                  >
                    <div>
                      <p className="text-sm font-medium break-all">
                        Order #{order._id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ₹{order.totalAmount}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                      <StatusDot
                        color={ORDER_FLOW[order.orderStatus]?.dot}
                        label={ORDER_FLOW[order.orderStatus]?.label}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOpenOrder(order)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ================= ADDRESSES ================= */}
        {activeTab === "address" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Saved Addresses
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose delivery location
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

            {isAddressLoading ? (
              <p>Loading addresses…</p>
            ) : (
              <SavedAddresses
                selectedAddress={currentSelectedAddress}
                setSelectedAddress={setCurrentSelectedAddress}
                onEdit={handleEditAddress}
                onDelete={handleDeleteAddress}
              />
            )}
          </>
        )}
      </main>
    </div>
  </div>

  {/* EDIT ADDRESS DIALOG */}
  <EditAddressDialog
    open={editDialogOpen}
    setOpen={setEditDialogOpen}
    address={editingAddress}
    onUpdated={(addr) => {
      setCurrentSelectedAddress(addr);
      dispatch(fetchAllAddresses(user.id));
    }}
  />

  {/* ORDER DETAILS */}
  <Dialog open={!!openOrder} onOpenChange={() => setOpenOrder(null)}>
    {openOrder && (
      <DialogContent className="w-[95%] sm:max-w-[700px] rounded-2xl">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <Separator />
        <p><b>Order ID:</b> {openOrder._id}</p>
        <p><b>Total:</b> ₹{openOrder.totalAmount}</p>
      </DialogContent>
    )}
  </Dialog>
</section>
  );
}

/* ================= SIDEBAR ITEM ================= */
function SidebarItem({ active, icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 sm:gap-3
        px-3 sm:px-4 py-2 sm:py-3
        rounded-xl text-sm font-medium transition
        whitespace-nowrap
        ${
          active
            ? "bg-[#C9A24D]/15 text-[#1F2933]"
            : "text-[#6B7280] hover:bg-[#F5EFE6]"
        }
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="sm:inline">{label}</span>
    </button>
  );
}

export default ShoppingAccount;
