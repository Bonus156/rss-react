import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from '../components/modal';
import { results, singleCharacter } from '../sources/products';
import { HomePage } from '../pages/homePage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  charactersAPI: {
    queries: {
      'getCharactersByName("")': {
        data: {
          results: results.results,
        },
      },
    },
  },
  tile: {
    searchValue: '',
  },
};
const store = mockStore(initialState);

let isVisible = true;
function setVisible(visibility: boolean) {
  isVisible = !visibility;
}

describe('Modal Component', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve({
            json: () => new Promise((resolve) => resolve(singleCharacter)),
            ok: () => new Promise((resolve) => resolve(true)),
          });
        })
    );
  });

  test('should display text in modal window', async () => {
    render(<Modal heroID={7} isVisible={isVisible} setVisible={setVisible} />);
    expect(await screen.findByText(/Abradolf Lincler/i)).toBeInTheDocument();
    expect(await screen.findByText(/Testicle Monster Dimension/i)).toBeInTheDocument();
    expect(await screen.findByText(/Genetic experiment/i)).toBeInTheDocument();
  });

  test('should render modal window with image', async () => {
    render(<Modal heroID={7} isVisible={isVisible} setVisible={setVisible} />);
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  test('should open modal window by click on image at homePage', async () => {
    // global.fetch = jest.fn().mockImplementationOnce(
    //   () =>
    //     new Promise((resolve) => {
    //       resolve({ json: () => new Promise((resolve) => resolve(results)) });
    //     })
    // );
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    global.fetch = jest.fn().mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve({
            json: () => new Promise((resolve) => resolve(singleCharacter)),
            ok: () => new Promise((resolve) => resolve(true)),
          });
        })
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
    // global.fetch = jest.fn().mockImplementationOnce(
    //   () =>
    //     new Promise((resolve) => {
    //       resolve({ json: () => new Promise((resolve) => resolve(results)) });
    //     })
    // );
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    // global.fetch = jest.fn().mockImplementationOnce(
    //   () =>
    //     new Promise((resolve) => {
    //       resolve({
    //         json: () => new Promise((resolve) => resolve(singleCharacter)),
    //         ok: () => new Promise((resolve) => resolve(true)),
    //       });
    //     })
    // );
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
