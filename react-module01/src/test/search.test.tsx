import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../components/search';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  tile: {
    searchValue: '',
  },
};
const store = mockStore(initialState);

describe('SearchBar', () => {
  test('render searchBar', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });

  test('load the last search value from state if it exists', () => {
    initialState.tile.searchValue = 'test';
    localStorage.setItem('search', 'test');
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
    expect(searchInput.value).toBe('test');
  });
});
