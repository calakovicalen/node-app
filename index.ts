import { IncomingMessage, ServerResponse } from 'http';
import {
  createUser,
  deleteUser,
  getUserHobbies,
  getUsers,
  updateUserHobbies,
} from './handlers';

const http = require('http');
const url = require('url');

export const PORT = 8000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = url.parse(req.url!, true);

    if (parsedUrl.pathname === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (parsedUrl.pathname === '/api/users' && req.method === 'GET') {
      getUsers(req, res);
    } else if (
      parsedUrl.pathname.startsWith('/api/users/') &&
      req.method === 'DELETE'
    ) {
      deleteUser(req, res);
    } else if (
      parsedUrl.pathname.startsWith('/api/users/') &&
      parsedUrl.pathname.endsWith('/hobbies') &&
      req.method === 'GET'
    ) {
      getUserHobbies(req, res);
    } else if (
      parsedUrl.pathname.startsWith('/api/users/') &&
      parsedUrl.pathname.endsWith('/hobbies') &&
      req.method === 'PATCH'
    ) {
      updateUserHobbies(req, res);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }
);

server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
