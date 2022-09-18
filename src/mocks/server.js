import { setupServer } from 'msw/node';
import { Handlers } from './Handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...Handlers);