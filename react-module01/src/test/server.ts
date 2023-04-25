import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { results, singleCharacter } from '../sources/products';

const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (_request, response, context) => {
    return response(context.status(200), context.json(results));
  }),
  rest.get('https://rickandmortyapi.com/api/character/7', (_request, response, context) => {
    return response(context.status(200), context.json(singleCharacter));
  }),
];

const server = setupServer(...handlers);

export default server;
