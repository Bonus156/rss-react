import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../components/search';

describe('SearchBar', () => {
  test('render searchBar', () => {
    render(<SearchBar />);
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });

  test('load the last search value from local storage if it exists', () => {
    localStorage.setItem('search', 'test');
    render(<SearchBar />);
    const searchInput = screen.getByRole('searchbox') as HTMLInputElement;
    expect(searchInput.value).toBe('test');
  });
});
