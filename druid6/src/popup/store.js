import { configureStore } from '@reduxjs/toolkit';
import serverReducer from './server/serverSlice';

export default configureStore({
  reducer: {
    server: serverReducer,
  },
});
