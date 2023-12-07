import express from 'express';
import passport from 'passport';

import { login, register } from '@/controllers/user.controller';
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
    successReturnToOrRedirect: `${frontendUrl}/secret`,
    failureRedirect: `${frontendUrl}/login`,
  })
);

router.get('/facebook', passport.authorize('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successReturnToOrRedirect: `${frontendUrl}/secret`,
    failureRedirect: `${frontendUrl}/login`,
  })
);

router.post('/login', passport.authenticate('local'), login);
router.post('/register', register);

export default router;
