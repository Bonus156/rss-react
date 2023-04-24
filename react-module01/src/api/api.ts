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

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const charactersAPI = createApi({
  reducerPath: 'charactersAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCharactersByName: build.query<InfoResults, string>({
      query: (name = '') => `/${name && `?name=${name}`}`,
    }),
    getCharacterById: build.query<Character, number>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersByNameQuery, useGetCharacterByIdQuery } = charactersAPI;
