import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('test Pages and Navigation components', () => {
  it('render AboutPage', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
  });
  it('render FormPage', () => {
    render(
      <MemoryRouter initialEntries={['/form']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
