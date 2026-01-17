import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import {
  updateOrderStatus,
  getOrderDetailsForAdmin,
  getAllOrdersForAdmin,
} from "@/store/admin/order-slice";
import { ORDER_FLOW } from "@/config";
import StatusDot from "../common/status-dots";

function AdminOrderDetailsView({ orderDetails }) {
  const dispatch = useDispatch();

  if (!orderDetails) return null;

  const current = ORDER_FLOW[orderDetails.orderStatus];
  const nextStatus = current?.next;

  const canProceed =
    orderDetails.paymentStatus === "paid" &&
    !current?.final;

  const handleNext = () => {
    dispatch(
      updateOrderStatus({
        id: orderDetails._id,
        orderStatus: nextStatus,
      })
    ).then(() => {
      dispatch(getOrderDetailsForAdmin(orderDetails._id));
      dispatch(getAllOrdersForAdmin());
    });
  };

  return (
    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFFCF7]">
      <h2 className="text-lg font-semibold">
        Order Details
      </h2>

      <Separator />

      {/* SUMMARY */}
      <div className="grid gap-3 text-sm">
        <p>
          <b>Order ID:</b> {orderDetails._id}
        </p>
        <p>
          <b>Total Amount:</b> ₹
          {orderDetails.totalAmount}
        </p>

        <div className="flex gap-4">
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

      {/* ITEMS */}
      <div>
        <h4 className="font-medium mb-2">
          Ordered Items
        </h4>
        <ul className="space-y-2 text-sm">
          {orderDetails.cartItems?.map((item) => (
            <li
              key={item._id}
              className="flex justify-between border rounded-md px-3 py-2 bg-white"
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* SHIPPING */}
      <div className="text-sm">
        <h4 className="font-medium mb-2">
          Shipping Info
        </h4>
        <p>{orderDetails.addressInfo?.address}</p>
        <p>{orderDetails.addressInfo?.city}</p>
        <p>{orderDetails.addressInfo?.pincode}</p>
        <p>{orderDetails.addressInfo?.phone}</p>
      </div>

      <Separator />

      {/* ACTION */}
      {canProceed ? (
        <Button className="w-full" onClick={handleNext}>
          Move to “{ORDER_FLOW[nextStatus].label}”
        </Button>
      ) : (
        <div className="text-sm text-muted-foreground text-center">
          No further action available
        </div>
      )}
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
