import express from 'express';
import passport from 'passport';

import {
  isLogin,
  login,
  register,
  logout,
  updateUser,
  getStudentInfo,
  updateUserPassword,
} from '@/controllers/user.controller';
import { isAuth } from '@/utils/isAuth';
import { env } from '@/utils/env';

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
    successReturnToOrRedirect: `${env.CLIENT_URL}`,
  })
);

router.get('/facebook', passport.authorize('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successReturnToOrRedirect: `${env.CLIENT_URL}`,
  })
);

router.post('/login', login);

router.post('/register', register);

router.get('/isLogin', isAuth, isLogin);

router.post('/logout', logout);

router.put('/', isAuth, updateUser);

router.put('/password', isAuth, updateUserPassword);

router.get('/student', isAuth, getStudentInfo);

export default router;
