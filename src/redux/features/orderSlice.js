import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_ROOT from "~/utils/constants";

export const fetchOrderHistory = createAsyncThunk(
  "order/fetchOrderHistory",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.accessToken;
      if (!token) {
        return rejectWithValue("Không có token xác thực!");
      }
      const response = await axios.get(`${API_ROOT}/account/order/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("fetchOrderHistory", response);

      return response.data.data; // Assuming data contains the orders array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Có lỗi xảy ra");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
