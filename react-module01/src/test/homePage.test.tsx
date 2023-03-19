import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '../pages/homePage';

describe('HomePage', () => {
  test('is displays card', () => {
    render(<HomePage />);
    expect(screen.getByText(/Alien/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Human/i)).toHaveLength(11);
  });
});
