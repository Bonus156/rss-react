import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomeTitle, AboutTitle, NotFoundTitle, Navigation } from '../components/navigation';

describe('test HomeTitle, AboutTitle and NotFoundTitle in Navigation component', () => {
  it('render AboutTitle', () => {
    const { getByText } = render(<AboutTitle />);
    const titleElement = getByText(/About Us/i);
    expect(titleElement).toBeInTheDocument();
  });
  it('render NotFoundTitle', () => {
    const { getByText } = render(<NotFoundTitle />);
    const titleErrElement = getByText(/Error 404/i);
    expect(titleErrElement).toBeInTheDocument();
  });
  it('render HomeTitle', () => {
    const { getByText } = render(<HomeTitle />);
    const titleHomeElement = getByText(/Home/i);
    expect(titleHomeElement).toBeInTheDocument();
  });
  it('render Navigation', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const titleHomeElement = getByText(/Home/i);
    const titleAboutElement = getByText(/About Us/i);
    expect(titleHomeElement).toBeInTheDocument();
    expect(titleAboutElement).toBeInTheDocument();
  });
});
