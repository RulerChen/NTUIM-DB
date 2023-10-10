import express from 'express';
import passport from 'passport';

import { login, register } from '@/controllers/user.controller';

const router = express.Router();

router.get('/isAuthenticated', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'Authenticated' });
  }
});

router.post('/login', passport.authenticate('local'), login);

router.post('/register', register);

export default router;
