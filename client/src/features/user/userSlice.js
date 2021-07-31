import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  token: null,
  photo: null,
  name: null,
  role: null,
  _id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.photo = action.payload.photo;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state._id = action.payload._id;
    },

    setSignOutState: (state) => {
      state.email = null;
      state.token = null;
      state.photo = null;
      state.name = null;
      state.role = null;
      state._id = null;
    },
  },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;

export const selectUserEmail = (state) => state.user.email;
export const selectUserToken = (state) => state.user.token;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserName = (state) => state.user.name;
export const selectUserRole = (state) => state.user.role;
export const selectUserId = (state) => state.user._id;

export default userSlice.reducer;
