import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type NameUrl = {
  name: string;
  url: string;
};

interface Character {
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

interface InfoResults {
  info: Info;
  results: Character[];
}

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const charactersAPI = createApi({
  reducerPath: 'charactersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCharactersByName: build.query<InfoResults, string>({
      query: (name = '') => `${name && `?name=${name}`}`,
    }),
  }),
});

export const { useGetCharactersByNameQuery } = charactersAPI;

export async function getCharacters(): Promise<Character[]> {
  const response = await fetch(BASE_URL);
  const characters: InfoResults = await response.json();
  const heroes = characters.results;
  return heroes;
}

export async function getCharactersByName(name: string): Promise<Character[]> {
  const response = await fetch(`${BASE_URL}?name=${name}`);
  if (!response.ok) {
    throw Error('Characters not found');
  }
  const characters: InfoResults = await response.json();
  const heroes = characters.results;
  return heroes;
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await fetch(`${BASE_URL}${id}`);
  if (!response.ok) {
    throw Error('Character not found');
  }
  const character: Character = await response.json();
  return character;
}
