import React, { useEffect, useState } from 'react';
import { SearchBar } from '../components/search';
import { Card } from '../components/cards';
import { getAllCharacters, getCharacters } from '../models/api';
import { Character } from '../models/types';

export function HomePage() {
  const [heroes, setHeroes] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const getHeroes = async () => {
    let data: Character[];
    if (searchValue) {
      data = await getCharacters(searchValue);
    } else {
      data = await getAllCharacters();
    }
    setHeroes(data);
  };

  useEffect(() => {
    getHeroes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className="container mx-auto pt-5">
      <SearchBar setInputValue={setSearchValue} />
      <div className="flex flex-wrap gap-2">
        {heroes.map((hero) => (
          <Card {...hero} key={hero.id} />
        ))}
      </div>
    </div>
  );
}
