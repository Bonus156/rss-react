import React from 'react';
import { Character } from '../models/types';

interface CardProps {
  hero: Character;
  setHeroID: (heroID: number) => void;
  setVisible: (isVisible: boolean) => void;
}

export function Card({ hero, setHeroID, setVisible }: CardProps) {
  const handleClick = () => {
    setVisible(true);
    setHeroID(hero.id);
  };

  return (
    <div
      className="border py-2 px-2 rounded w-[calc((100%-1rem)/3)] flex flex-col items-center lg:w-[calc((100%-1.5rem)/4)] duration-200 cursor-pointer hover:scale-105"
      onClick={handleClick}
    >
      <img src={hero.image} className="w-full" alt={hero.name} />
      <p className="font-bold ">
        <span className="font-normal">Name: </span>
        {hero.name}
      </p>
      <p>{hero.species}</p>
    </div>
  );
}
