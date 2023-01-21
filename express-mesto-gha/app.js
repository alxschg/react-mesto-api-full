const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

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

app.use(requestLogger);

app.use(express.json());
app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log('App started.');
});
