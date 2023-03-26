import { Component } from 'react';
import { UserCard } from './userCard';
import { UserInfo, StateForm } from '../models/types';

export class FormCards extends Component<StateForm, StateForm> {
  constructor(props: StateForm) {
    super(props);
    this.state = this.props;
    this.setCards = this.setCards.bind(this);
  }

  setCards(newCard: UserInfo) {
    const cardsArray = [...this.state.cardsList];
    cardsArray.push(newCard);
    this.setState({ cardsList: cardsArray });
  }

  render() {
    const { cardsList } = this.state;
    return (
      <div className="container mx-auto pt-5">
        <div className="flex flex-wrap gap-2">
          {cardsList.map((card) => (
            <UserCard
              key={card.userName}
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
}
