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
        payment === "all" ||
        order.paymentStatus === payment;

      return matchSearch && matchStatus && matchPayment;
    });
  }, [orderList, search, status, payment]);

  const openDetails = (id) => {
    // console.log(id);
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="rounded-2xl bg-[#FFFCF7]">
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">
              Orders Management
            </CardTitle>

            {/* 🔍 SEARCH & FILTERS */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Input
                placeholder="Search Order ID or Amount"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[260px]"
              />

              <select
                className="border rounded-md px-3 py-2"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>

              <select
                className="border rounded-md px-3 py-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                {Object.entries(ORDER_FLOW).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </CardHeader>

          {/* 📋 TABLE */}
          <CardContent className="p-0">
            <div className="max-h-[70vh] overflow-y-auto">
              <Table>
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
                        <TableCell className="font-mono text-xs">
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

                        <TableCell className="font-semibold">
                          ₹{order.totalAmount}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
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

      {/* 🧾 DETAILS */}
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
