import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormPage } from '../pages/formPage';
import { CardsState } from '../models/types';

describe('HomePage', () => {
  test('is shows form type text with empty cardList', () => {
    const cardList: CardsState = { cardsList: [] };
    render(<FormPage setCards={cardList} />);
    expect(screen.getByText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByText(/Your birthday/i)).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    expect(screen.getAllByRole('option')).toHaveLength(6);
  });
});
