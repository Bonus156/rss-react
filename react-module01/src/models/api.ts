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

export async function getAllCharacters(): Promise<Character[]> {
  const host = await fetch('https://rickandmortyapi.com/api/character/');
  const characters: InfoResults = await host.json();
  const heroes = characters.results;
  return heroes;
}

export async function getCharacters(name: string): Promise<Character[]> {
  const host = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
  if (!host.ok) {
    throw Error('Could not fetch data');
  }
  const characters: InfoResults = await host.json();
  const heroes = characters.results;
  return heroes;
}

export async function getCurrentCharacter(id: number): Promise<Character> {
  const host = await fetch(`https://rickandmortyapi.com/api/character/?id=${id}`);
  if (!host.ok) {
    throw Error('Could not fetch data');
  }
  const character: Character = await host.json();
  return character;
}
