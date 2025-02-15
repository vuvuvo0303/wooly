import { configureStore } from "@reduxjs/toolkit";
import activeProductReducer from "./features/activeProductSlice";

const store = configureStore({
    reducer: {
        products: activeProductReducer,
    },
});

export default store;
