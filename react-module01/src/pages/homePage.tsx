import React, { useCallback, useEffect, useState } from 'react';
import { SearchBar } from '../components/search';
import { Card } from '../components/cards';
import { getCharacters, getCharactersByName } from '../api/api';
import { Character } from '../models/types';
import { Modal } from '../components/modal';

export function HomePage() {
  const [heroes, setHeroes] = useState<Character[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [visibilityModal, setVisibilityModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentHeroID, setHeroID] = useState<number>(1);

  const getHeroes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let data: Character[];
    try {
      if (searchValue) {
        data = await getCharactersByName(searchValue);
      } else {
        data = await getCharacters();
      }
      setHeroes(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    getHeroes();
  }, [getHeroes]);

  return (
    <div className="container mx-auto pt-5">
      <SearchBar setInputValue={setSearchValue} />
      <div className="flex flex-wrap gap-2">
        {error && <div className="m-auto text-2xl font-bold text-red-800">{error}</div>}
        {isLoading && (
          <div className="m-auto shrink-0 align-middle w-12 h-12 inset-auto border-8 rounded-full border-black/40 border-t-black/90 animate-spin" />
        )}
        {!error &&
          !isLoading &&
          heroes.map((hero) => (
            <Card hero={hero} setHeroID={setHeroID} setVisible={setVisibilityModal} key={hero.id} />
          ))}
      </div>
      {visibilityModal && (
        <Modal heroID={currentHeroID} isVisible={visibilityModal} setVisible={setVisibilityModal} />
      )}
    </div>
  );
}
