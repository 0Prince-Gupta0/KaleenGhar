import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  isLoading: false,
  featureImageList: [],
};

/* ================= GET ================= */
export const getFeatureImages = createAsyncThunk(
  "common/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/api/common/feature/get`
    );
    return response.data;
  }
);

/* ================= ADD ================= */
export const addFeatureImage = createAsyncThunk(
  "common/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${BASE_URL}/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

/* ================= DELETE ================= */
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `${BASE_URL}/api/common/feature/delete/${id}`
    );
    return { id, ...response.data };
  }
);

const commonSlice = createSlice({
  name: "commonFeature",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* GET */
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })

      /* ADD */
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.featureImageList.unshift(action.payload.data);
        }
      })

      /* DELETE */
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.featureImageList = state.featureImageList.filter(
          (item) => item._id !== action.payload.id
        );
      });
  },
});

export default commonSlice.reducer;
