import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../pages/notFound';

describe('test NotFoundPage component', () => {
  it('render NotFoundPage', () => {
    const { getByText } = render(<NotFoundPage />);
    const linkElement = getByText(/404/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('landing on a bad page', () => {
    const badRoute = '/some/bad/route';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error 404/i)).toBeInTheDocument();
  });
});
