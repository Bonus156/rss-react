import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character } from '../models/types';

interface TileState {
  heroes: Character[];
  searchValue: string;
}

const initialState: TileState = {
  heroes: [],
  searchValue: '',
};

const tileSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    // getHeroes(state, action) {},
    // toggleModal(state, action) {},
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    // getSearchResults(state, action: PayloadAction<string>) {
    //   state.searchValue = action.payload;
    // },
  },
});

export const { setSearchValue } = tileSlice.actions;

export default tileSlice.reducer;
