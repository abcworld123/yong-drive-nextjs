import connectRedis from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import config from 'config';

const client = createClient({ legacyMode: true });
const redisClient = client as typeof client & { v4: Omit<typeof client, 'v4'> };

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
