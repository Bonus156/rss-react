import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormPage } from '../pages/formPage';

describe('HomePage', () => {
  test('is shows type text', () => {
    render(<FormPage />);
    expect(screen.getByText(/Type something/i)).toBeInTheDocument();
  });
});
