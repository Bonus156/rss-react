import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HomeTitle, AboutTitle, NotFoundTitle } from '../components/navigation';

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
});
