import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  HomeTitle,
  AboutTitle,
  NotFoundTitle,
  Navigation,
  FormTitle,
} from '../components/navigation';

describe('test HomeTitle, AboutTitle and NotFoundTitle in Navigation component', () => {
  it('render AboutTitle', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <AboutTitle />
      </MemoryRouter>
    );
    const titleElement = getByText(/About Us/i);
    expect(titleElement).toBeInTheDocument();
  });
  it('render AboutPage', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Navigation />
      </MemoryRouter>
    );
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
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
  it('render FormTitle', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/form']}>
        <FormTitle />
      </MemoryRouter>
    );
    const titleFormElement = getByText(/Forms/i);
    expect(titleFormElement).toBeInTheDocument();
  });
  it('render Navigation', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    const titleHomeElement = getByText(/Home/i);
    const titleAboutElement = getByText(/About Us/i);
    const titleFormElement = getByText(/Forms/i);
    expect(titleHomeElement).toBeInTheDocument();
    expect(titleAboutElement).toBeInTheDocument();
    expect(titleFormElement).toBeInTheDocument();
  });
});
