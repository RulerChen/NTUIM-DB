import express from 'express';
import passport from 'passport';

import { login, logout, register } from '@/controllers/user.controller';
import { frontendUrl } from '@/utils/url';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: `${frontendUrl}`,
    failureRedirect: `${frontendUrl}/login`,
  })
);

router.get('/facebook', passport.authorize('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successReturnToOrRedirect: `${frontendUrl}`,
    failureRedirect: `${frontendUrl}/login`,
  })
);

router.post(
  '/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: `${frontendUrl}`,
    failureRedirect: `${frontendUrl}/login`,
  }),
  login
);
router.post('/register', register);

router.post('/logout', logout);

export default router;
