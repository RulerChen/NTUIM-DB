import express from 'express';
import passport from 'passport';

import { isLogin, login, logout, register } from '@/controllers/user.controller';
import { isAuth } from '@/utils/isAuth';
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
  })
);

router.get('/facebook', passport.authorize('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successReturnToOrRedirect: `${frontendUrl}`,
  })
);

router.post('/login', login);

router.post('/register', register);

router.get('/isLogin', isAuth, isLogin);

router.post('/logout', logout);

export default router;
