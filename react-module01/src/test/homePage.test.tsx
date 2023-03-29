import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '../pages/homePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage', () => {
  test('is displays card text', () => {
    render(<HomePage />);
    expect(screen.getByText(/Alien/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Human/i)).toHaveLength(11);
  });
  test('should render cardsField with correct number of cards', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('img')).toHaveLength(12);
  });
});
