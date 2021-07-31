import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.text = action.payload.text;
    },
  },
});

export const { setSearch } = searchSlice.actions;

export const selectText = (state) => state.search.text;

export default searchSlice.reducer;
