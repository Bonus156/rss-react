import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserCard } from '../components/userCard';
import { UserInfoString } from '../models/types';

describe('UserCard', () => {
  test('is shows user card', () => {
    const testFile = new File(['test'], 'test.png', { type: 'image/png' });
    window.URL.createObjectURL = jest.fn();
    const userInfo: UserInfoString = {
      userName: 'Name',
      birthday: '03-02-2002',
      country: 'USA',
      isMale: false,
      image: URL.createObjectURL(testFile),
    };
    render(<UserCard {...userInfo} />);
    expect(screen.getByText(/Ms Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Country: USA/i)).toBeInTheDocument();
  });
});
