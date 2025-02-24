import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_ROOT from "~/utils/constants";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_ROOT}/category/get-all-category`);
      // console.log("fetchCategories",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi lấy danh mục!");
    }
  }
);

const initialState = {
  categories: [],
  status: "idle", 
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
