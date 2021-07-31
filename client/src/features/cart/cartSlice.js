import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(window.localStorage.getItem("cart")),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart;
    },
  },
});

export const { setCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
