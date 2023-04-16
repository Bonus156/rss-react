import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '../pages/homePage';
import { Provider } from 'react-redux';
import store from '../store/index';

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
});
