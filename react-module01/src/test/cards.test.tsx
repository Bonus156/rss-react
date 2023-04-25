import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../components/cards';
import { singleCharacter } from '../sources/products';

const setHeroID = (heroID: number) => {
  console.log(heroID);
};
const setVisible = (isVisible: boolean) => {
  console.log(isVisible);
};

describe('Card', () => {
  test('is shows card', () => {
    render(<Card hero={singleCharacter} setHeroID={setHeroID} setVisible={setVisible} />);

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });
});
