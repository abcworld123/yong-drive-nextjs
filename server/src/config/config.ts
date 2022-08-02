import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  auth: {
    pw: process.env.AUTH_PASSWORD,
  },
  // database: {
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   database: process.env.DB_DATABASE,
  //   user: process.env.DB_USER,
  //   pass: process.env.DB_PASS,
  // },
};

export default config;
