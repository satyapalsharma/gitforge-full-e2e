import { Router, Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/password';
import { findUserByUsername, findUserByEmail, addUser, findUserById, getNextId } from '../models/User';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    if (findUserByUsername(username)) {
      return res.status(409).json({ error: 'Username already taken.' });
    }
    if (findUserByEmail(email)) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    const passwordHash = await hashPassword(password);
    const id = getNextId();
    const user = { id, username, email, passwordHash };
    addUser(user);

    req.session.userId = id;

    return res.status(201).json({ message: 'User registered successfully.', userId: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).json({ error: 'Username or email is required.' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required.' });
    }

    let user;
    if (username) {
      user = findUserByUsername(username);
    } else {
      user = findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const passwordMatch = await comparePassword(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    req.session.userId = user.id;

    return res.status(200).json({ message: 'Login successful.', userId: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out.' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Logged out successfully.' });
  });
});

// GET /api/auth/me (requires authentication)
router.get('/me', authMiddleware, (req: Request, res: Response) => {
  const userId = req.session.userId;
  const user = findUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }
  // Return user info without the password hash
  const { passwordHash, ...userInfo } = user;
  return res.status(200).json(userInfo);
});

export default router;
