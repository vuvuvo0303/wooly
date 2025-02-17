import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_ROOT from "~/utils/constants";

export const fetchUserProfile = createAsyncThunk(
  "account/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.accessToken; 

      if (!token) {
        return rejectWithValue("Không có token xác thực!");
      }

      const response = await axios.get(`${API_ROOT}/account/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("fetchUserProfile",response.data.data);
      
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi lấy dữ liệu!");
    }
  }
);

const initialState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null; // Reset user khi logout
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = accountSlice.actions;
export default accountSlice.reducer;
