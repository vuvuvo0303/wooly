import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_ROOT from "~/utils/constants";

// export const searchProducts = createAsyncThunk(
//   "search/fetchProducts",
//   async (productName, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${API_ROOT}/homepage/search-product?productName=${encodeURIComponent(productName)}`
//       );
//       console.log("searchProducts",response);
      
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Lỗi tìm kiếm sản phẩm");
//     }
//   }
// );


export const searchProducts = createAsyncThunk(
    "search/fetchProducts",
    async ({ productName, categoryName }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${API_ROOT}/homepage/search-product`, {
          params: {
            productName: productName ? encodeURIComponent(productName) : "",
            categoryName: categoryName ? encodeURIComponent(categoryName) : "",
          },
        });
        console.log("searchProducts", response);
        return response.data.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi tìm kiếm sản phẩm");
      }
    }
  );
  
      

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
