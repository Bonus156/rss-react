import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormPage } from '../pages/formPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  user: {
    cards: [],
  },
};
const store = mockStore(initialState);

describe('FormPage', () => {
  test('is shows form type text with empty cardList', () => {
    render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
    expect(screen.getByText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByText(/Your birthday/i)).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    expect(screen.getAllByRole('option')).toHaveLength(6);
  });
});
