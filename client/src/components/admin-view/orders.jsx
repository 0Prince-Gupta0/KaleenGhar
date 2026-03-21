import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderState,
} from "@/store/admin/order-slice";
import { ORDER_FLOW } from "@/config";
import StatusDot from "../common/status-dots";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {
  const dispatch = useDispatch();
  const { orderList = [], orderDetails } = useSelector(
    (state) => state.adminOrder
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    return orderList.filter((order) => {
      const matchSearch =
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        String(order.totalAmount).includes(search);

      const matchStatus =
        status === "all" || order.orderStatus === status;

      const matchPayment =
        payment === "all" || order.paymentStatus === payment;

      return matchSearch && matchStatus && matchPayment;
    });
  }, [orderList, search, status, payment]);

  const openDetails = (id) => {
    dispatch(getOrderDetailsForAdmin(id)).then(() =>
      setOpen(true)
    );
  };

  const closeDetails = () => {
    setOpen(false);
    dispatch(resetOrderState());
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Card className="rounded-2xl bg-[#FFFCF7]">
          <CardHeader className="border-b">
            <CardTitle className="text-lg sm:text-xl font-semibold">
              Orders Management
            </CardTitle>

            {/* SEARCH & FILTERS */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-4">
              <Input
                placeholder="Search Order ID or Amount"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-[260px]"
              />

  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">

  {/* PAYMENT */}
  <Select value={payment} onValueChange={setPayment}>
    <SelectTrigger className="w-full sm:w-[180px] bg-[#FFFCF7] border border-[#E6DED1]">
      <SelectValue placeholder="All Payments" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="all">All Payments</SelectItem>
      <SelectItem value="paid">Paid</SelectItem>
      <SelectItem value="pending">Pending</SelectItem>
    </SelectContent>
  </Select>

  {/* STATUS */}
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
            </div>
          </CardHeader>

          {/* TABLE */}
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="min-w-[650px]">
                <TableHeader className="sticky top-0 bg-[#F5EFE6]">
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredOrders.length ? (
                    filteredOrders.map((order, i) => (
                      <TableRow
                        key={order._id}
                        className={
                          i % 2 === 0
                            ? "bg-white"
                            : "bg-[#FAF6EF]"
                        }
                      >
                        <TableCell className="font-mono text-[10px] sm:text-xs break-all">
                          {order._id}
                        </TableCell>

                        <TableCell>
                          <StatusDot
                            color={
                              order.paymentStatus === "paid"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }
                            label={order.paymentStatus}
                            tooltip="Payment status"
                          />
                        </TableCell>

                        <TableCell>
                          {ORDER_FLOW[order.orderStatus] && (
                            <StatusDot
                              color={
                                ORDER_FLOW[order.orderStatus]
                                  .dot
                              }
                              label={
                                ORDER_FLOW[order.orderStatus]
                                  .label
                              }
                              tooltip="Order status"
                            />
                          )}
                        </TableCell>

                        <TableCell className="font-semibold whitespace-nowrap">
                          ₹{order.totalAmount}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="text-xs sm:text-sm"
                            onClick={() =>
                              openDetails(order._id)
                            }
                          >
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-10 text-muted-foreground"
                      >
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DETAILS */}
      <Dialog open={open} onOpenChange={closeDetails}>
        {orderDetails && (
          <AdminOrderDetailsView
            orderDetails={orderDetails}
          />
        )}
      </Dialog>
    </>
  );
}

export default AdminOrdersView;