export interface UserInfo {
  userName: string;
  birthday: string;
  country: string;
  isMale: boolean;
  image: File;
}

type NameUrl = {
  name: string;
  url: string;
};

export type CardData = {
  name: string;
  species: string;
  image: string;
};

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: NameUrl;
  location: NameUrl;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export interface InfoResults {
  info: Info;
  results: Character[];
}
