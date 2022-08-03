import connectRedis from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import config from 'config';

const redisClient = createClient({ legacyMode: true });

function sessionStore() {
  const RedisStore = connectRedis(session);
  redisClient.connect().catch(console.error);
  return session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({ client: redisClient }),
  });
}

export { redisClient, sessionStore };
