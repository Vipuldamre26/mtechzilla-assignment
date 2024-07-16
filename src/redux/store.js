import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slices/LoginSlice";

const store = configureStore({
    reducer: {
        userInfo: LoginSlice 
    }
})

export default store;