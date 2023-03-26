export interface Hero {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Props {
  setCards: StateForm;
}

export interface UserInfo {
  userName: string;
  birthday: string;
  country: string;
  isMale: boolean;
  image: File;
}

export interface StateForm {
  cardsList: UserInfo[];
}
