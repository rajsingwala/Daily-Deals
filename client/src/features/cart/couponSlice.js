import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupon: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCouponRedux: (state, action) => {
      state.coupon = action.payload.coupon;
    },
  },
});

export const { setCouponRedux } = couponSlice.actions;

export const selectCouponRedux = (state) => state.coupon.coupon;

export default couponSlice.reducer;
