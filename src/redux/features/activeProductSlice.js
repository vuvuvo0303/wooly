import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_ROOT from "~/utils/constants";

// Fetch latest products
export const fetchLatestProducts = createAsyncThunk(
    "products/fetchLatest",
    async () => {
        const response = await axios.get(`${API_ROOT}/homepage/latest-product`);
        return response.data.data;
    }
);

// Fetch best-seller products
export const fetchBestSellerProducts = createAsyncThunk(
    "products/fetchBestSeller",
    async () => {
        const response = await axios.get(`${API_ROOT}/homepage/best-seller`);
        return response.data.data;
    }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
    "products/fetchAll",
    async () => {
        const response = await axios.get(`${API_ROOT}/product/get-all-product`);
        return response.data;
    }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (productId) => {
        const response = await axios.get(`${API_ROOT}/product/get-product-by/${productId}`);
        console.log("fetchById", response.data);
        return response.data;
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchByCategory",
    async (categoryId) => {
        const response = await axios.get(`${API_ROOT}/product/get-by-category/${categoryId}`);
        console.log("fetchByCategory",response.data);
        
        return response.data;
    }
);

const activeProductSlice = createSlice({
    name: "products",
    initialState: {
        latest: { items: [], status: "idle", error: null },
        bestSeller: { items: [], status: "idle", error: null },
        all: { items: [], status: "idle", error: null },
        productDetail: { item: null, status: "idle", error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Latest Products
            .addCase(fetchLatestProducts.pending, (state) => {
                state.latest.status = "loading";
            })
            .addCase(fetchLatestProducts.fulfilled, (state, action) => {
                state.latest.status = "succeeded";
                state.latest.items = action.payload;
            })
            .addCase(fetchLatestProducts.rejected, (state, action) => {
                state.latest.status = "failed";
                state.latest.error = action.error.message;
            })

            // Best-Seller Products
            .addCase(fetchBestSellerProducts.pending, (state) => {
                state.bestSeller.status = "loading";
            })
            .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
                state.bestSeller.status = "succeeded";
                state.bestSeller.items = action.payload;
            })
            .addCase(fetchBestSellerProducts.rejected, (state, action) => {
                state.bestSeller.status = "failed";
                state.bestSeller.error = action.error.message;
            })

            // All Products
            .addCase(fetchAllProducts.pending, (state) => {
                state.all.status = "loading";
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.all.status = "succeeded";
                state.all.items = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.all.status = "failed";
                state.all.error = action.error.message;
            })

            // Product Detail by ID
            .addCase(fetchProductById.pending, (state) => {
                state.productDetail.status = "loading";
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.productDetail.status = "succeeded";
                state.productDetail.item = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.productDetail.status = "failed";
                state.productDetail.error = action.error.message;
            })

            //product by cate id
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default activeProductSlice.reducer;
