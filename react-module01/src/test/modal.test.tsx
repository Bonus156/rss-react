import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from '../components/modal';
import { HomePage } from '../pages/homePage';
import { Provider } from 'react-redux';
import store from '../store/index';
import 'whatwg-fetch';
import server from './server';

let isVisible = true;
function setVisible(visibility: boolean) {
  isVisible = !visibility;
}

describe('Modal Component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  test('should display text in modal window', async () => {
    render(
      <Provider store={store}>
        <Modal heroID={7} isVisible={isVisible} setVisible={setVisible} />
      </Provider>
    );

    expect(await screen.findByText(/Abradolf Lincler/i)).toBeInTheDocument();
    expect(await screen.findByText(/Testicle Monster Dimension/i)).toBeInTheDocument();
    expect(await screen.findByText(/Genetic experiment/i)).toBeInTheDocument();
  });

  test('should render modal window with image', async () => {
    render(
      <Provider store={store}>
        <Modal heroID={7} isVisible={isVisible} setVisible={setVisible} />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  test('should open modal window by click on image at homePage', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    await waitFor(() => {
      const abradolf = screen.getAllByRole('img')[6];
      act(() => {
        abradolf.click();
      });
    });
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeVisible();
    });
    expect(await screen.findByText(/Testicle Monster Dimension/i)).toBeInTheDocument();
    expect(await screen.findByText(/Genetic experiment/i)).toBeInTheDocument();
  });

  test('should close modal window by click on overlay after opening', async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      const abradolf = screen.getAllByRole('img')[6];
      act(() => {
        abradolf.click();
      });
    });
    const overlay = screen.getByTestId('modal');
    act(() => {
      overlay.click();
    });
    await waitFor(() => {
      expect(overlay).not.toBeVisible();
    });
    expect(screen.queryByText(/Testicle Monster Dimension/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Genetic experiment/i)).not.toBeInTheDocument();
  });
});
