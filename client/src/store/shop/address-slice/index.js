import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  isLoading: false,
  addressList: [],
};

/* ================= ADD ADDRESS ================= */
export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/address/add`,
      formData
    );
    return response.data;
  }
);

/* ================= FETCH ADDRESSES ================= */
export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

/* ================= EDIT ADDRESS ================= */
export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${BASE_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return response.data;
  }
);

/* ================= DELETE ADDRESS ================= */
export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${BASE_URL}/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

/* ================= SLICE ================= */
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------- ADD ---------- */
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;

        // ✅ PUSH NEW ADDRESS INTO LIST
        if (action.payload?.data) {
          state.addressList.unshift(action.payload.data);
        }
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })

      /* ---------- FETCH ---------- */
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data || [];
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })

      /* ---------- EDIT ---------- */
      .addCase(editaAddress.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated) return;

        const index = state.addressList.findIndex(
          (addr) => addr._id === updated._id
        );
        if (index !== -1) {
          state.addressList[index] = updated;
        }
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const deletedId = action.payload?.addressId;
        if (!deletedId) return;

        state.addressList = state.addressList.filter(
          (addr) => addr._id !== deletedId
        );
      });
  },
});

export default addressSlice.reducer;
