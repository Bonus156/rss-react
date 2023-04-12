import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '../pages/homePage';
import { results } from '../sources/products';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve({ json: () => new Promise((resolve) => resolve(results)) });
        })
    );
  });

  test('is displays placeholder text', async () => {
    render(<HomePage />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Search by name/i)).toBeInTheDocument();
    });
  });

  test('should render all cards with right text', async () => {
    render(<HomePage />);
    expect(await screen.findAllByText(/Name/i)).toHaveLength(12);
    expect(await screen.findAllByText(/Human/i)).toHaveLength(11);
    expect(await screen.findByText(/Alien/i)).toBeInTheDocument();
  });

  test('should render cardsField with correct number of cards', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(12);
    });
  });
});
