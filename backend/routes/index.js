const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { users } = require('./users');
const { cards } = require('./cards');
const { NotFoundError } = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const routes = express.Router();

routes.all('*', express.json());

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(/https?:\/\/(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),
  createUser,
);
routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

routes.use('/users', auth, users);
routes.use('/cards', auth, cards);

routes.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Карточка или пользователь не найден или был запрошен несуществующий роут'));
});

module.exports = { routes };
