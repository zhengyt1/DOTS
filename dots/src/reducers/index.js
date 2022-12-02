import { createSlice } from '@reduxjs/toolkit';

export const userIDReducer = createSlice({
  name: 'userID',
  initialState: {
    value: '',
  },
  reducers: {
    userLogin: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    userLogout: (state) => {
      state.value = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, userLogout } = userIDReducer.actions;

export default userIDReducer.reducer;
