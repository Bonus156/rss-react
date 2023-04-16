import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInfoString } from '../models/types';

interface UserState {
  cards: UserInfoString[];
  confirmation: string;
}

const initialState: UserState = {
  cards: [],
  confirmation: '',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserInfoString>) {
      state.cards.push({
        userName: action.payload.userName,
        birthday: action.payload.birthday,
        country: action.payload.country,
        isMale: action.payload.isMale,
        image: action.payload.image,
      });
    },
    showConfirmation(state, action: PayloadAction<string>) {
      state.confirmation = action.payload;
    },
  },
});

export const { addUser, showConfirmation } = userSlice.actions;

export default userSlice.reducer;
