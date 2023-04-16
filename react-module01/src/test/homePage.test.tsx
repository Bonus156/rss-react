import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '../pages/homePage';
import { results } from '../sources/products';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  charactersAPI: {
    queries: {
      'getCharactersByName("")': {
        data: {
          results: results.results,
        },
      },
    },
  },
  tile: {
    searchValue: '',
  },
};
const store = mockStore(initialState);

describe('HomePage', () => {
  test('is displays placeholder text', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Search by name/i)).toBeInTheDocument();
    });
  });

  test('should render all cards with right text', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(await screen.findAllByText(/Name/i)).toHaveLength(12);
    expect(await screen.findAllByText(/Human/i)).toHaveLength(11);
    expect(await screen.findByText(/Alien/i)).toBeInTheDocument();
  });

  test('should render cardsField with correct number of cards', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(12);
    });
  });
});
