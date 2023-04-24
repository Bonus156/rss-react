import React from 'react';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { render, screen, waitFor } from '@testing-library/react';
import { HomePage } from '../pages/homePage';
import { Provider } from 'react-redux';
import store from '../store/index';
import server from './server';

describe('HomePage', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
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
