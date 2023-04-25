import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormCards } from '../components/formCards';
import { UserInfoString } from '../models/types';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('UserCard', () => {
  test('is shows user card', () => {
    const testFile1 = new File(['test1'], 'test.png', { type: 'image/png' });
    const testFile2 = new File(['test2'], 'test.jpg', { type: 'image/jpg' });
    window.URL.createObjectURL = jest.fn();
    const cardsList: UserInfoString[] = [
      {
        userName: 'Name',
        birthday: '03-02-2002',
        country: 'USA',
        isMale: false,
        image: URL.createObjectURL(testFile1),
      },
      {
        userName: 'Surname',
        birthday: '30-11-2018',
        country: 'Uganda',
        isMale: true,
        image: URL.createObjectURL(testFile2),
      },
    ];
    const initialState = {
      user: {
        cards: cardsList,
      },
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <FormCards />
      </Provider>
    );
    expect(screen.getByText(/Ms Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
