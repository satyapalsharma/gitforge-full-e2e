import { getUserById, updateUser } from '../models/User';
import { UserProfile, UserPreferences } from '../types/settings';

export function getProfile(userId: string): UserProfile | null {
  const user = getUserById(userId);
  return user || null;
}

export function updateProfile(
  userId: string,
  updates: {
    displayName?: string;
    username?: string;
    avatarUrl?: string | null;
    bio?: string | null;
    email?: string;
    preferences?: Partial<UserPreferences>;
  }
): UserProfile | null {
  const user = getUserById(userId);
  if (!user) return null;

  const newPreferences: UserPreferences = {
    theme: user.preferences.theme,
    language: user.preferences.language,
    notifications: user.preferences.notifications,
    ...(updates.preferences || {}),
  };

  const updatedUser = updateUser(userId, {
    ...(updates.displayName !== undefined
      ? { displayName: updates.displayName }
      : {}),
    ...(updates.username !== undefined
      ? { username: updates.username }
      : {}),
    ...(updates.avatarUrl !== undefined
      ? { avatarUrl: updates.avatarUrl }
      : {}),
    ...(updates.bio !== undefined ? { bio: updates.bio } : {}),
    ...(updates.email !== undefined ? { email: updates.email } : {}),
    preferences: newPreferences,
  });

  return updatedUser || null;
}
