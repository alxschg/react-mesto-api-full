require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { routes } = require('./routes');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/mestodb')
  .then(() => {
    console.log('Database connected.');
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

const allowedCors = [
  'http://mesto.alxschg.nomoredomains.rocks/',
  'https://mesto.alxschg.nomoredomains.rocks/',
  'http://localhost:3000',
  'https://localhost:3000',
];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowedCors.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false, credentials: true };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use(requestLogger);

app.use(express.json());
app.use(routes);

app.use(errorLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log('App started.');
});
