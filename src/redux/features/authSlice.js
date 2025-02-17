import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import API_ROOT from "~/utils/constants";

// Đăng ký
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/register`, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Đăng ký thất bại!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Đăng nhập
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/login`, data);
      const { accessToken, refreshToken, role, message } = response.data;
      console.log("login",response.data);
      
      toast.success(message);
      return { accessToken, refreshToken, role };
    } catch (error) {
      toast.error(error.response?.data?.error || "Đăng nhập thất bại!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Lấy OTP
export const getOtp = createAsyncThunk(
  "auth/getOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/get-otp`, { email });
      toast.success(response.data.message);
      console.log("OTP",response.data);
      
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Lấy OTP thất bại!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// forgotPassword
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_ROOT}/auth/forgot-password`, data);
      console.log("forgotPasswordSlice",response.data);
      
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Đăng xuất
export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  dispatch(logout());
  toast.info("Đã đăng xuất!");
});

const initialState = {
  accessToken: null,
  refreshToken: null,
  role: null,
  otp: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Đăng ký
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || "Có lỗi xảy ra!";
      })

      // Đăng nhập
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error || "Có lỗi xảy ra!";
      })

      // Lấy OTP
      .addCase(getOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOtp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.otp = action.payload;
      })
      .addCase(getOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Có lỗi xảy ra!";
      })

      // forgetPassword
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Có lỗi xảy ra!";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
