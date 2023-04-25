import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import tileReduser from './tileSlice';
import { charactersAPI } from '../api/api';

const store = configureStore({
  reducer: {
    user: userReduser,
    tile: tileReduser,
    [charactersAPI.reducerPath]: charactersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(charactersAPI.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
