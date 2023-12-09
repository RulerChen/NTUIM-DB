import express from 'express';
import passport from 'passport';

import { isLogin, login, register } from '@/controllers/user.controller';
import { frontendUrl } from '@/utils/url';

const router = express.Router();

const authCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json('You are not logged in');
  }
};
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

router.post('/login', passport.authenticate('local'), login);
router.post('/register', register);

router.get('/isLogin', authCheck, isLogin);

export default router;
