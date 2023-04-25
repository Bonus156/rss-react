import { UserCard } from './userCard';
import { UserInfoString } from '../models/types';
import { v1 as uuidv1 } from 'uuid';
import { useAppSelector } from '../store/hooks';

export interface FormCardsProps {
  cardsList: UserInfoString[];
}

export function FormCards() {
  const cards: UserInfoString[] = useAppSelector<UserInfoString[]>((state) => state.user.cards);

  return (
    <div className="container mx-auto pt-5">
      <div className="flex flex-wrap gap-2">
        {cards.map((card) => (
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
