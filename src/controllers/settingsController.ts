import { Response } from 'express';
import { getProfile, updateProfile } from '../services/profileService';
import { AuthRequest } from '../middleware/auth';

export function getProfileHandler(req: AuthRequest, res: Response) {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const profile = getProfile(userId);
  if (!profile) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({ profile });
}

export function updateProfileHandler(req: AuthRequest, res: Response) {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { displayName, username, avatarUrl, bio, email, preferences } =
    req.body;

  const updatedProfile = updateProfile(userId, {
    displayName,
    username,
    avatarUrl,
    bio,
    email,
    preferences,
  });

  if (!updatedProfile) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({ profile: updatedProfile });
}
