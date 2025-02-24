import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import API_ROOT from "~/utils/constants";

// Thêm sản phẩm vào giỏ hàng
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, cartItems }, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.auth.accessToken; // Lấy token từ Redux Persist

    if (!token) {
      toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng!");
      return rejectWithValue("Unauthorized");
    }

    try {
      const response = await axios.post(
        `${API_ROOT}/cart/add?productId=${productId}&quantity=${quantity}`,
        cartItems,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        }
      );
      toast.success("Đã thêm vào giỏ hàng thành công!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Thêm vào giỏ hàng thất bại!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
