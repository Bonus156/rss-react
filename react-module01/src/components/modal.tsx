import React, { MouseEvent } from 'react';
import { Character } from '../models/types';

export interface ModalProps {
  hero: Character;
  isVisible?: boolean;
  setVisible: (isVisible: boolean) => void;
}

export function Modal({ hero, isVisible, setVisible }: ModalProps) {
  const handleClick = () => {
    setVisible(false);
  };

  return (
    <div
      className={isVisible ? 'block w-full h-full backdrop-blur-lg fixed inset-0' : 'hidden'}
      onClick={handleClick}
    >
      <div
        className="border bg-white py-2 px-2 rounded w-1/2 flex flex-col items-center m-auto lg:w-1/3"
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <img src={hero.image} className="w-full" alt={hero.name} />
        <p className="font-bold ">
          <span className="font-normal">Name: </span>
          {hero.name}
        </p>
        <p>Origin: {hero.origin.name}</p>
        <p>Status: {hero.status}</p>
        <p>Species: {hero.species}</p>
        <p>Gender: {hero.gender}</p>
        <p>Location: {hero.location.name}</p>
      </div>
    </div>
  );
}
