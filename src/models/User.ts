import { UserProfile } from '../types/settings';

// In-memory store – replace with a real database in production
const users: UserProfile[] = [
  {
    id: 'user1',
    email: 'test@example.com',
    username: 'testuser',
    displayName: 'Test User',
    avatarUrl: null,
    bio: 'Hello, I am a test user.',
    preferences: {
      theme: 'light',
      language: 'en',
      notifications: true,
    },
  },
];

export function getUserById(id: string): UserProfile | undefined {
  return users.find((u) => u.id === id);
}

export function updateUser(
  id: string,
  updates: Partial<UserProfile>
): UserProfile | undefined {
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) return undefined;
  users[userIndex] = { ...users[userIndex], ...updates };
  return users[userIndex];
}
