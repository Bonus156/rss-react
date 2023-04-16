import React, { useState } from 'react';
import { SearchBar } from '../components/search';
import { Card } from '../components/cards';
import { Modal } from '../components/modal';
import { useGetCharactersByNameQuery } from '../api/api';
import { useAppSelector } from '../store/hooks';

export function HomePage() {
  const [visibilityModal, setVisibilityModal] = useState<boolean>(false);
  const [currentHeroID, setHeroID] = useState<number>(1);

  const searchValue = useAppSelector<string>((state) => state.tile.searchValue);

  const { data, error, isLoading } = useGetCharactersByNameQuery(searchValue);

  const err404 = error && 'status' in error && error.status === 404 ? error : undefined;

  return (
    <div className="container mx-auto pt-5">
      <SearchBar />
      <div className="flex flex-wrap gap-2">
        {err404 && !isLoading && (
          <div className="m-auto text-2xl font-bold text-red-800">{'Characters not found'}</div>
        )}
        {isLoading && (
          <div className="m-auto shrink-0 align-middle w-12 h-12 inset-auto border-8 rounded-full border-black/40 border-t-black/90 animate-spin" />
        )}
        {!err404 &&
          !isLoading &&
          data?.results.map((hero) => (
            <Card hero={hero} setHeroID={setHeroID} setVisible={setVisibilityModal} key={hero.id} />
          ))}
      </div>
      {visibilityModal && (
        <Modal heroID={currentHeroID} isVisible={visibilityModal} setVisible={setVisibilityModal} />
      )}
    </div>
  );
}
