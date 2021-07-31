import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cod: false,
};

const codSlice = createSlice({
  name: "cod",
  initialState,
  reducers: {
    setCod: (state, action) => {
      state.cod = action.payload.cod;
    },
  },
});

export const { setCod } = codSlice.actions;

export const selectCod = (state) => state.cod.cod;

export default codSlice.reducer;
