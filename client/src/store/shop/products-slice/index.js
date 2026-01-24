import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  isLoading: false,
  productList: [],
  pagination: null, // ✅ REQUIRED
  productDetails: null,
};

/* ================= FETCH PRODUCTS ================= */

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchAllFilteredProducts",
  async (
    { filterParams, sortParams, search, page, limit },
    { signal }
  ) => {
    const params = new URLSearchParams();

    // Filters
    Object.entries(filterParams).forEach(([key, values]) => {
      values.forEach((v) => params.append(key, v));
    });

    // Search
    if (search) params.append("search", search);

    // Sort
    if (sortParams) params.append("sortBy", sortParams);

    // Pagination
    params.append("page", page);
    params.append("limit", limit);

    const response = await axios.get(
      `${BASE_URL}/api/shop/products/get?${params.toString()}`,
      { signal }
    );

    return response.data; // ✅ return full response
  }
);

/* ================= PRODUCT DETAILS ================= */

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/products/get/${id}`
    );
    return response.data;
  }
);

/* ================= SLICE ================= */

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH PRODUCTS */
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        state.pagination = action.payload.pagination; // ✅ FIXED
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
      })

      /* FETCH PRODUCT DETAILS */
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
