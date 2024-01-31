import { IncomingMessage, ServerResponse } from 'http';
import { User } from './types';

const { v4: uuidv4 } = require('uuid');

const users: User[] = [];

function createUser(req: IncomingMessage, res: ServerResponse) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const userData = JSON.parse(body);
    const newUser = { id: uuidv4(), ...userData };
    users.push(newUser);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  });
}

function getUsers(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.writeHead(200, { 'Content-Type': 'application.json' });
  res.end(JSON.stringify(users));
}

function deleteUser(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url!.split('/')[3];
  const index = users.findIndex(user => user.id === userId);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(deletedUser));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User not found' }));
  }
}

function getUserHobbies(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url!.split('/')[3];
  const user = users.find(u => u.id === userId);

  if (user) {
    res.setHeader('Cache-Control', 'private, max-age=3600');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user.hobbies || []));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User not found' }));
  }
}

function updateUserHobbies(req: IncomingMessage, res: ServerResponse) {
  const userId = req.url!.split('/')[3];
  const user = users.find(u => u.id === userId);

  if (user) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const hobbiesToAdd = JSON.parse(body);

      if (!user.hobbies) {
        user.hobbies = hobbiesToAdd;
      } else {
        for (const hobby of hobbiesToAdd) {
          if (!user.hobbies.includes(hobby)) {
            user.hobbies.push(hobby);
          }
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user.hobbies));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'User not found' }));
  }
}
export { createUser, getUsers, deleteUser, getUserHobbies, updateUserHobbies };
