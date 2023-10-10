// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import { Client } from 'pg';

import { dbConfig } from './db.config';
// import { env } from '@/utils/env';
import type { User, UserSerialized } from '@/types/user.type';

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/user/google/callback',
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: env.GITHUB_CLIENT_ID,
//       clientSecret: env.GITHUB_CLIENT_SECRET,
//       callbackURL: '/api/user/github/callback',
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      const client = new Client(dbConfig);
      client.connect();
      const query = `SELECT * FROM users WHERE email = $1`;
      const values = [email];

      client
        .query(query, values)
        .then((result) => {
          if (result.rows.length === 0) {
            return done(null, false, { message: 'Incorrect email' });
          } else {
            const user = result.rows[0];
            if (user.password !== password) {
              return done(null, false, { message: 'Incorrect password' });
            } else {
              return done(null, user);
            }
          }
        })
        .catch((err) => {
          done(err.stack);
        })
        .finally(() => {
          client.end();
        });
    }
  )
);

passport.serializeUser((user: UserSerialized, done) => {
  console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  console.log('deserializeUser', user);
  const client = new Client(dbConfig);
  client.connect();
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [user.email];
  client
    .query(query, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return done(null, false);
      } else {
        const user = result.rows[0];
        return done(null, user);
      }
    })
    .catch((err) => {
      done(err.stack);
    })
    .finally(() => {
      client.end();
    });
});
