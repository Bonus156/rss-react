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
  const heroes = characters.results as Character[];
  return heroes;
}

export async function getCharacters(name: string): Promise<Character[]> {
  const host = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`);
  const characters: InfoResults = await host.json();
  const heroes = characters.results as Character[];
  return heroes;
}
