import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import { v4 as uuidv4 } from 'uuid';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { pool } from '@/models/init';
import { env } from '@/utils/env';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      try {
        const query = `SELECT * FROM member WHERE email = $1`;
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
          return done(null, false, { message: 'Incorrect email' });
        } else {
          const user = result.rows[0];
          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password' });
          } else {
            return done(null, user);
          }
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.SERVER_URL}/user/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json;
      const { id } = profile;

      try {
        const query = `SELECT * FROM member WHERE email = $1`;
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
          const randomPassword = uuidv4();
          const saltRounds = 10;
          const hashedPassword = bcrypt.hashSync(randomPassword, saltRounds);

          const query_add = `
          INSERT INTO member (member_id, email, name, password, member_role)
          VALUES ($1, $2, $3, $4, $5)
          `;
          const values_add = [id, email, name, hashedPassword, 'Non-student'];
          await pool.query(query_add, values_add);
        }
        const res = await pool.query(query, values);
        const user = res.rows[0];
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: env.FACEBOOK_APP_ID,
      clientSecret: env.FACEBOOK_APP_SECRET,
      callbackURL: `${env.SERVER_URL}/user/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json;
      const { id } = profile;

      try {
        const query = `SELECT * FROM member WHERE email = $1`;
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
          const randomPassword = uuidv4();
          const saltRounds = 10;
          const hashedPassword = bcrypt.hashSync(randomPassword, saltRounds);

          const query_add = `
          INSERT INTO member (member_id, email, name, password, member_role)
          VALUES ($1, $2, $3, $4, $5)
          `;

          const values_add = [id, email, name, hashedPassword, 'Non-student'];
          await pool.query(query_add, values_add);
        }
        const res = await pool.query(query, values);
        const user = res.rows[0];
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  done(null, user.member_id);
});

passport.deserializeUser(async (member_id: string, done) => {
  try {
    const query = `SELECT * FROM member WHERE member_id = $1`;
    const values = [member_id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return done(null, false);
    } else {
      const user = result.rows[0];
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
});
