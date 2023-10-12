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

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  function (req, res) {
    res.redirect('http://localhost:3000/secret');
  }
);

router.get('/facebook', passport.authorize('facebook', { scope: ['email'] }));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000',
  }),
  function (req, res) {
    res.redirect('http://localhost:3000/secret');
  }
);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

router.post('/register', register);

export default router;
