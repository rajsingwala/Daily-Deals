import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
import drawerReducer from "../features/cart/drawerSlice";
import couponReducer from "../features/cart/couponSlice";
import codReducer from "../features/cart/codSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponReducer,
    cod: codReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
