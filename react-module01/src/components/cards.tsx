import { Hero } from '../models/types';
import React from 'react';

interface HeroProps {
  hero: Hero;
}

export function Card({ hero }: HeroProps) {
  return (
    <div className="border py-2 px-2 rounded w-[calc((100%-1rem)/3)] flex flex-col items-center lg:w-[calc((100%-1.5rem)/4)]">
      <img src={hero.image} className="w-full" alt={hero.name} />
      <p className="font-bold">{hero.name}</p>
      <p>{hero.species}</p>
    </div>
  );
}
