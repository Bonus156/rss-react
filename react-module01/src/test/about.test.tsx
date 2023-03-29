import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AboutPage } from '../pages/about';

describe('test AboutPage component', () => {
  it('render AboutPage', () => {
    const { getByText } = render(<AboutPage />);
    const linkElement = getByText(/About Us/i);
    expect(linkElement).toBeInTheDocument();
  });
});
