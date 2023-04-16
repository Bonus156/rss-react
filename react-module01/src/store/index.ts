import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import tileReduser from './tileSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
    tile: tileReduser,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
