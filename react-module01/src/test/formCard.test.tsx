import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormCards } from '../components/formCards';
import { UserInfo } from '../models/types';

describe('UserCard', () => {
  test('is shows user card', () => {
    const testFile1 = new File(['test1'], 'test.png', { type: 'image/png' });
    const testFile2 = new File(['test2'], 'test.jpg', { type: 'image/jpg' });
    window.URL.createObjectURL = jest.fn();
    const cardsList: UserInfo[] = [
      {
        userName: 'Name',
        birthday: '03-02-2002',
        country: 'USA',
        isMale: false,
        image: testFile1,
      },
      {
        userName: 'Surname',
        birthday: '30-11-2018',
        country: 'Uganda',
        isMale: true,
        image: testFile2,
      },
    ];
    render(<FormCards cardsList={cardsList} />);
    expect(screen.getByText(/Ms Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
