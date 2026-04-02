export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

// In‑memory store – replace with a database in production
const users: User[] = [];

export const findUserByUsername = (username: string): User | undefined => {
  return users.find(u => u.username === username);
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(u => u.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};

export const addUser = (user: User): void => {
  users.push(user);
};

export const getNextId = (): string => {
  return (users.length + 1).toString();
};
