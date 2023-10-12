import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import passport from 'passport';
import { Client } from 'pg';

import { dbConfig } from '@/config/db.config';
import { env } from '@/utils/env';
import { backendurl } from '@/utils/url';
import type { User } from '@/types/user.type';

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

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${backendurl}/user/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json;
      const client = new Client(dbConfig);
      client.connect();
      const query = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      client
        .query(query, values)
        .then((result) => {
          if (result.rows.length === 0) {
            const query_add = `
            INSERT INTO users (email, username, password)
            VALUES ($1, $2, $3)
            RETURNING *;
            `;
            const values_add = [email, name, ''];
            client
              .query(query_add, values_add)
              .then((result_add) => {
                console.log(result_add.rows[0]);
                return done(null, result_add.rows[0]);
              })
              .catch((err) => {
                done(err.stack);
              });
          }
          const user = result.rows[0];
          return done(null, user);
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

passport.use(
  new FacebookStrategy(
    {
      clientID: env.FACEBOOK_APP_ID,
      clientSecret: env.FACEBOOK_APP_SECRET,
      callbackURL: `${backendurl}/user/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json;
      const client = new Client(dbConfig);
      await client.connect();
      const query = `SELECT * FROM users WHERE email = $1`;
      const values = [email];

      client
        .query(query, values)
        .then((result) => {
          if (result.rows.length === 0) {
            const query_add = `
            INSERT INTO users (email, username, password)
            VALUES ($1, $2, $3)
            RETURNING *;
            `;
            const values_add = [email, name, ''];
            client
              .query(query_add, values_add)
              .then((result_add) => {
                console.log(result_add.rows[0]);
                return done(null, result_add.rows[0]);
              })
              .catch((err) => {
                done(err.stack);
              });
          }
          const user = result.rows[0];
          return done(null, user);
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

passport.serializeUser((user, done) => {
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
