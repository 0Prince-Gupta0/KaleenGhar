import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  updateOrderStatus,
  getOrderDetailsForAdmin,
  getAllOrdersForAdmin,
} from "@/store/admin/order-slice";
import { ORDER_FLOW } from "@/config";
import StatusDot from "../common/status-dots";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

function AdminOrderDetailsView({ orderDetails }) {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("");

  if (!orderDetails || Array.isArray(orderDetails)) return null;

  const current = ORDER_FLOW[orderDetails.orderStatus];
  const nextStatus = current?.next;

  const canProceed =
    orderDetails.paymentStatus === "paid" &&
    !current?.final;

  const handleUpdate = () => {
    if (!selectedStatus) return;

    // const confirmUpdate = window.confirm(
    //   `Are you sure you want to move order from "${current?.label}" to "${ORDER_FLOW[selectedStatus]?.label}"?`
    // );

    // if (!confirmUpdate) return;

    dispatch(
      updateOrderStatus({
        id: orderDetails._id,
        orderStatus: selectedStatus,
      })
    ).then(() => {
      dispatch(getOrderDetailsForAdmin(orderDetails._id));
      dispatch(getAllOrdersForAdmin());
      setSelectedStatus("");
    });
  };

  return (
    <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFFCF7] p-6 space-y-5">

      {/* HEADER */}
      <h2 className="text-xl font-semibold">
        Order Details
      </h2>

      {/* SUMMARY */}
      <div className="grid gap-2 text-sm">
        <p><b>Order ID:</b> {orderDetails._id}</p>

        <p>
          <b>Order Date:</b>{" "}
          {new Date(orderDetails.orderDate).toLocaleString()}
        </p>

        <p><b>Total Amount:</b> ₹{orderDetails.totalAmount}</p>

        <p><b>Payment ID:</b> {orderDetails.paymentId}</p>

        <div className="flex gap-3 mt-2">
          <StatusDot
            color={
              orderDetails.paymentStatus === "paid"
                ? "bg-green-500"
                : "bg-yellow-500"
            }
            label={orderDetails.paymentStatus}
            tooltip="Payment status"
          />

          {current && (
            <StatusDot
              color={current.dot}
              label={current.label}
              tooltip="Order status"
            />
          )}
        </div>
      </div>

      <Separator />

      {/* CUSTOMER */}
      <div className="bg-white rounded-xl border p-4">
        <h4 className="font-medium mb-2">Customer Info</h4>
        <p className="text-sm font-medium">
          {orderDetails.userId?.userName || "No Name"}
        </p>
        <p className="text-sm text-muted-foreground">
          {orderDetails.userId?.email}
        </p>
      </div>

      <Separator />

      {/* ITEMS */}
      <div>
        <h4 className="font-medium mb-3">Ordered Items</h4>

        <div className="space-y-3">
          {orderDetails.cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 border rounded-xl p-3 bg-white"
            >
              {/* IMAGE */}
              <img
                src={item.image || "/placeholder.png"}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md border"
              />

              {/* INFO */}
              <div className="flex-1 text-sm">
                <p className="font-medium">{item.title}</p>

                <p className="text-muted-foreground">
                  Size: {item.size || "N/A"}
                </p>

                <p>
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>

              {/* TOTAL */}
              <div className="text-sm font-semibold">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* SHIPPING */}
      <div className="bg-white rounded-xl border p-4 text-sm">
        <h4 className="font-medium mb-2">Shipping Info</h4>
        <p>{orderDetails.addressInfo?.address}</p>
        <p>
          {orderDetails.addressInfo?.city},{" "}
          {orderDetails.addressInfo?.pincode}
        </p>
        <p>📞 {orderDetails.addressInfo?.phone}</p>
      </div>

      <Separator />

      {/* ACTION */}
      {canProceed ? (
        <div className="space-y-3">

          {/* STATUS TRANSITION */}
          {/* <p className="text-sm text-muted-foreground text-center">
            {current?.label} → {ORDER_FLOW[nextStatus]?.label}
          </p> */}

          {/* DROPDOWN */}
<Select
  value={selectedStatus}
  onValueChange={(value) => setSelectedStatus(value)}
>
<SelectTrigger className="w-full h-11 bg-white border border-[#E6DED1] rounded-md">
  {selectedStatus ? (
  <div className="flex items-center gap-2 justify-center w-full">
    <span
      className={`w-2 h-2 rounded-full ${
        ORDER_FLOW[selectedStatus]?.dot
      }`}
    />
    <span>{ORDER_FLOW[selectedStatus]?.label}</span>
  </div>
) : (
  <span className="text-muted-foreground">
    Change Status
  </span>
)}
</SelectTrigger>

  <SelectContent
    position="popper"
    side="bottom"
    align="start"
    sideOffset={6}
    className="
      w-[var(--radix-select-trigger-width)] 
      bg-white 
      border 
      rounded-md 
      shadow-lg 
      max-h-[250px] 
      overflow-y-auto 
      z-[1000]
    "
  >
    {Object.entries(ORDER_FLOW).map(([key, value]) => (
      <SelectItem
        key={key}
        value={key}
        className="cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-sm"
      >
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${value.dot}`} />
          <span>{value.label}</span>
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          {/* CONFIRM BUTTON */}
          <Button
            className="w-full"
            disabled={!selectedStatus}
            onClick={handleUpdate}
          >
            Confirm Status Update
          </Button>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground text-center">
          No further action available
        </div>
      )}
    </DialogContent>
  );
}

export default AdminOrderDetailsView;