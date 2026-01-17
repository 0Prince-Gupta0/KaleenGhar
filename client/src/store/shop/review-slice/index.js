import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/shop/review/add`,
        formdata,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getReviews = createAsyncThunk(
  "/order/getReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/shop/review/${productId}`
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ================= GET REVIEWS ================= */
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload?.message;
      })

      /* ================= ADD REVIEW ================= */
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.unshift(action.payload.data); // add immediately
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message;
      });
  },
});

export default reviewSlice.reducer;
