import http from 'http';
import compression from 'compression';
import express from 'express';
import session from 'express-session';
// import redis from 'redis';
import config from 'config';
import router from 'routes';

const app = express();
const server = http.createServer(app);

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: true,
}));

app.use('/', router);

app.use((req, res, next) => {
  console.warn(`\x1B[33m404\x1B[0m | ${req.url}`);
  res.status(404).send('404');
});

app.use((err, req, res, next) => {
  console.error(`\x1B[31m500\x1B[0m | ${req.url}`);
  if (app.settings.env === 'production') {
    console.error(err);
    res.status(500).send('500');
  } else {
    next(err.stack);
  }
});

server.on('error', (err) => {
  console.error(`\x1B[31mERROR\x1B[0m | ${err.stack}`);
});

server.listen(8200, () => {
  console.info('\x1B[36mconnected!!\x1B[0m');
});
