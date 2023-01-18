const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const users = express.Router();

users.get('/', getAllUsers);
users.get('/me', getCurrentUser);
users.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUser,
);
users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);

users.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(/https?:\/\/(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
    }),
  }),
  updateAvatar,
);
module.exports = { users };
