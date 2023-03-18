import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NotFoundPage } from '../pages/notFound';

describe('test NotFoundPage component', () => {
  it('render NotFoundPage', () => {
    const { getByText } = render(<NotFoundPage />);
    const linkElement = getByText(/404/i);
    expect(linkElement).toBeInTheDocument();
  });
});
