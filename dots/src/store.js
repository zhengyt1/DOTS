import { configureStore } from '@reduxjs/toolkit';
import userIDReducer from './reducers';

export default configureStore({
  reducer: {
    userID: userIDReducer,
  },
});
