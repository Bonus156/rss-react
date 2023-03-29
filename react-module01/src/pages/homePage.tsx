import { SearchBar } from '../components/search';
import React from 'react';
import { Card } from '../components/cards';
import { heroes } from '../sources/products';

export function HomePage() {
  return (
    <div className="container mx-auto pt-5">
      <SearchBar />
      <div className="flex flex-wrap gap-2">
        {heroes.map((hero) => (
          <Card hero={hero} key={hero.id} />
        ))}
      </div>
    </div>
  );
}
