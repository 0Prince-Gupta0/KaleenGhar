import { useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { ORDER_FLOW } from "@/config";
import StatusDot from "../common/status-dots";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  if (!orderDetails) return null;

  const current = ORDER_FLOW[orderDetails.orderStatus] || {
    label: orderDetails.orderStatus || "pending",
    dot: "bg-gray-500",
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

        <p><b>Payment ID:</b> {orderDetails.paymentId || "-"}</p>
        <p><b>Payment Method:</b> {orderDetails.paymentMethod || "-"}</p>

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

          <StatusDot
            color={current.dot}
            label={current.label}
            tooltip="Order status"
          />
        </div>
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
        <p className="font-medium">{user?.userName || "-"}</p>
        <p>{orderDetails.addressInfo?.address}</p>
        <p>
          {orderDetails.addressInfo?.city},{" "}
          {orderDetails.addressInfo?.pincode}
        </p>
        <p>📞 {orderDetails.addressInfo?.phone}</p>
        {orderDetails.addressInfo?.notes && (
          <p className="text-muted-foreground mt-1 text-xs">
            Notes: {orderDetails.addressInfo.notes}
          </p>
        )}
      </div>

    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
