import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  cartItems: [],
  isLoading: false,
};

/* ================= NORMALIZER ================= */
const mapCartItems = (items = []) =>
  items.map((item) => {
    const selectedSize =
      item.productId?.sizes?.find((s) => s.label === item.size) || {};

    return {
      productId: item.productId?._id || item.productId,
      title: item.productId?.title || item.title,
      image: item.productId?.gallery?.[0] || item.image,
      size: item.size,
      price:
        selectedSize?.salePrice ||
        selectedSize?.price ||
        item.price ||
        0,
      stock: selectedSize?.totalStock || 0,   // ✅ ADD THIS
      quantity: item.quantity,
    };
  });
/* ================= ADD ================= */
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, size, quantity }) => {
    const res = await axios.post(`${BASE_URL}/api/shop/cart/add`, {
      userId,
      productId,
      size,
      quantity,
    });
    return res.data;
  }
);

/* ================= FETCH ================= */
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const res = await axios.get(
      `${BASE_URL}/api/shop/cart/get/${userId}`
    );
    return res.data;
  }
);

/* ================= UPDATE ================= */
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, size, quantity }) => {
    const res = await axios.put(
      `${BASE_URL}/api/shop/cart/update-cart`,
      { userId, productId, size, quantity }
    );
    return res.data;
  }
);

/* ================= DELETE ================= */
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId, size }) => {
    const res = await axios.delete(
      `${BASE_URL}/api/shop/cart/${userId}/${productId}/${size}`
    );
    return res.data;
  }
);

/* ================= SLICE ================= */
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder

      /* ADD */
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = mapCartItems(action.payload?.data?.items);
      })

      /* FETCH */
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.data?.items || [];
      })

      /* UPDATE */
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = mapCartItems(action.payload?.data?.items);
      })

      /* DELETE */
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = mapCartItems(action.payload?.data?.items);
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;