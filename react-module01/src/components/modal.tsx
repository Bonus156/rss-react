import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { Character } from '../models/types';
import { getCharacterById } from '../api/api';

export interface ModalProps {
  heroID: number;
  isVisible?: boolean;
  setVisible: (isVisible: boolean) => void;
}

export function Modal({ heroID, isVisible, setVisible }: ModalProps) {
  const [currentHero, setCurrentHero] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClick = () => {
    setVisible(false);
  };

  const getHero = useCallback(async () => {
    const hero: Character = await getCharacterById(heroID);
    setCurrentHero(hero);
    setIsLoading(false);
  }, [heroID]);

  useEffect(() => {
    getHero();
  }, [getHero]);

  return (
    <div
      className={
        isVisible
          ? 'modal flex flex-col block justify-center w-full h-full backdrop-blur-lg fixed inset-0'
          : 'hidden'
      }
      data-testid="modal"
      onClick={handleClick}
    >
      <div
        className="border bg-white py-2 px-2 rounded w-1/2 flex flex-col items-center mx-auto lg:w-1/3"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="m-auto shrink-0 align-middle w-12 h-12 inset-auto border-8 rounded-full border-black/40 border-t-black/90 animate-spin" />
        )}
        {currentHero && (
          <>
            <div
              className="inline-block self-end absolute cursor-pointer hover:scale-105"
              onClick={handleClick}
            >
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#d2d2d2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.16998 14.83L14.83 9.17004"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.83 14.83L9.16998 9.17004"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <img src={currentHero.image} className="w-full" alt={currentHero.name} />
            <p className="font-bold text-lg">
              <span className="font-normal">Name: </span>
              {currentHero.name}
            </p>
            <p>Origin: {currentHero.origin.name}</p>
            {currentHero.type && <p>Type: {currentHero.type}</p>}
            <p
              className={
                currentHero.status === 'Alive'
                  ? 'text-green-800 font-medium'
                  : 'text-red-700 font-medium'
              }
            >
              <span className="text-black font-normal">Status: </span>
              {currentHero.status}
            </p>
            <p>Species: {currentHero.species}</p>
            <p>Gender: {currentHero.gender}</p>
            <p>Location: {currentHero.location.name}</p>
            <p className="text-sm">Created: {new Date(currentHero.created).toDateString()}</p>
            <p className="my-2 text-sm self-start">ID: {currentHero.id}</p>
          </>
        )}
      </div>
    </div>
  );
}
