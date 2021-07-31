import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload.visible;
    },
  },
});

export const { setVisible } = drawerSlice.actions;

export const selectVisible = (state) => state.drawer.visible;

export default drawerSlice.reducer;
