import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        {/* ================= ORDER INFO ================= */}
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id || "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>
              {orderDetails?.orderDate?.split("T")?.[0] || "-"}
            </Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderDetails?.totalAmount ?? 0}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod || "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus || "-"}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Badge
              className={`py-1 px-3 capitalize ${
                orderDetails?.orderStatus === "confirmed"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "rejected"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus || "pending"}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* ================= ITEMS ================= */}
        <div className="grid gap-2">
          <div className="font-medium">Order Details</div>

          <ul className="grid gap-3">
            {orderDetails?.cartItems?.length > 0 ? (
              orderDetails.cartItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{item?.title}</span>
                  <span>x{item?.quantity}</span>
                  <span>₹{item?.price}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No items found
              </p>
            )}
          </ul>
        </div>

        <Separator />

        {/* ================= SHIPPING ================= */}
        <div className="grid gap-2">
          <div className="font-medium">Shipping Info</div>

          <div className="grid gap-1 text-muted-foreground text-sm">
            <span>{user?.userName || "-"}</span>
            <span>{orderDetails?.addressInfo?.address || "-"}</span>
            <span>{orderDetails?.addressInfo?.city || "-"}</span>
            <span>{orderDetails?.addressInfo?.pincode || "-"}</span>
            <span>{orderDetails?.addressInfo?.phone || "-"}</span>
            {orderDetails?.addressInfo?.notes && (
              <span>{orderDetails.addressInfo.notes}</span>
            )}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
