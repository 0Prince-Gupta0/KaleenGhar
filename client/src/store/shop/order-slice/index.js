import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  stripeCheckoutURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

/* ================= CREATE ORDER ================= */
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/order/create`,
      orderData
    );
    return response.data;
  }
);

/* ================= STRIPE SESSION ================= */
export const createStripeCheckoutSession = createAsyncThunk(
  "/order/createStripeCheckoutSession",
  async ({ cartItems, orderId }) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/stripe/create-checkout-session`,
      { cartItems, orderId }
    );
    return response.data;
  }
);

/* ================= ORDERS ================= */
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/order/details/${id}`
    );
    return response.data;
  }
);

/* ================= SLICE ================= */
const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.stripeCheckoutURL = null;
      state.orderId = null;
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- CREATE ORDER ---------- */
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.orderId = null;
      })

      /* ---------- STRIPE ---------- */
      .addCase(createStripeCheckoutSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStripeCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stripeCheckoutURL = action.payload.url;
      })
      .addCase(createStripeCheckoutSession.rejected, (state) => {
        state.isLoading = false;
        state.stripeCheckoutURL = null;
      })

      /* ---------- LIST ORDERS ---------- */
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })

      /* ---------- ORDER DETAILS ---------- */
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderState } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
