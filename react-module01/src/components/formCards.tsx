import { UserCard } from './userCard';
import { FormCardsProps } from '../models/types';
import { v1 as uuidv1 } from 'uuid';

export function FormCards(cards: FormCardsProps) {
  const cardsList = cards.cardsList;
  return (
    <div className="container mx-auto pt-5">
      <div className="flex flex-wrap gap-2">
        {cardsList.map((card) => (
          <UserCard
            key={uuidv1()}
            userName={card.userName}
            birthday={card.birthday}
            country={card.country}
            isMale={card.isMale}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
}
