import { createSlice } from '@reduxjs/toolkit';
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
  },
});

// export const { getHeroes, toggleModal } = tileSlice.actions;

export default tileSlice.reducer;
