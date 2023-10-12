import express from 'express';
import passport from 'passport';

import { login, register } from '@/controllers/user.controller';
import { frontendUrl } from '@/utils/url';

const router = express.Router();

// const isAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect(`${frontendUrl}`);
//   }
// };

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: `${frontendUrl}` }),
  (req, res) => {
    res.redirect(`${frontendUrl}/secret`);
  }
);

router.get('/facebook', passport.authorize('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${frontendUrl}`,
  }),
  (req, res) => {
    res.redirect(`${frontendUrl}/secret`);
  }
);

router.post('/login', passport.authenticate('local'), login);
router.post('/register', register);

export default router;
