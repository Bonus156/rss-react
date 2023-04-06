import React from 'react';
import { Character } from '../models/types';

export function Card(hero: Character) {
  return (
    <div className="border py-2 px-2 rounded w-[calc((100%-1rem)/3)] flex flex-col items-center lg:w-[calc((100%-1.5rem)/4)] duration-200 hover:scale-105">
      <img src={hero.image} className="w-full" alt={hero.name} />
      <p className="font-bold">{hero.name}</p>
      <p>{hero.species}</p>
    </div>
  );
}
