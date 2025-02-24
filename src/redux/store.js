import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "~/redux/features/authSlice";
import activeProductReducer from "~/redux/features/activeProductSlice";
import categoryReducer from "~/redux/features/categorySlice";
import accountReducer from "~/redux/features/accountSlice";
import orderReducer from "./features/orderSlice";
import cartReducer from "./features/cartSlice";
import searchReducer from "./features/searchSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "role"], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: activeProductReducer,
    categories: categoryReducer,
    account: accountReducer,
    order: orderReducer,
    cart: cartReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
