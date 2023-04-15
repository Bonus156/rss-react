import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../store';

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
      <Provider store={store}>
        <MemoryRouter initialEntries={['/form']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
